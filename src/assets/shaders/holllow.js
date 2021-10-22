export default
`
//-----------------------------------------------------------
// ref
// https://www.shadertoy.com/view/lss3zr
// https://qiita.com/edo_m18/items/876f2857e67e26a053d6
// https://qiita.com/edo_m18/items/cbba0cc4e33a5aa3be55
//-----------------------------------------------------------

#define saturate(a) clamp(a, 0., 1.);

#define EPS 0.0001

#define USE_DIRECTIONAL_LIGHT
#define USE_AMBIENT_LIGHT

#define SAMPLE_COUNT 40

#define SHADOW_LENGTH 3.6
#define SHADOW_ITERATIONS 4

#define DENSITY_INTENSITY .1
#define AMBIENT_INTENSITY 50.

vec3 ABSORPTION_INTENSITY = vec3(.5, .8, .7) * .25;

vec3 sunDirection = normalize(vec3(.5, .8, .5));
vec3 lightColor = vec3(.3, .3, .2);
    
vec3 ambientLightDir = normalize(vec3(0., 1., 0.));
vec3 ambientLightColor = vec3(.9, .7, .3);

vec3 cloudColor = vec3(.92);    
    
mat3 m = mat3( 0.00,  0.80,  0.60,
              -0.80,  0.36, -0.48,
              -0.60, -0.48,  0.64);

float hash(float n)
{
    return fract(sin(n) * 43758.5453);
}

float noise(in vec3 x)
{
    vec3 p = floor(x);
    vec3 f = fract(x);
    
    f = f * f * (3.0 - 2.0 * f);
    
    float n = p.x + p.y * 57.0 + 113.0 * p.z;
    
    float res = mix(mix(mix(hash(n +   0.0), hash(n +   1.0), f.x),
                        mix(hash(n +  57.0), hash(n +  58.0), f.x), f.y),
                    mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                        mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
    return res;
}

float fbm(vec3 p)
{
    float f;
    p = m * p * 1.5;
    f  = .5 * noise(p);
    p = m * p * 2.;
    f += .15 * noise(p);
    //p = m * p * .2;
    //f += 0.15 * noise(p);
    return f;
}

float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}


float sdPlane(vec3 p, vec4 n) {
  return dot(p,n.xyz) + n.w;
}

float scene(vec3 p) {
    return 1. - sdPlane(p, vec4(0., 1., 0., 1.)) + fbm(p * .7 + iTime) * 2.8;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(EPS, 0);
    return normalize(
    	vec3(
            scene(p + e.xyy) - scene(p - e.xyy),
            scene(p + e.yxy) - scene(p - e.yxy),
            scene(p + e.yyx) - scene(p - e.yyx)
        )
    );
    
    /* cheap
    const float h = EPS;
    const vec2 k = vec2(1., -1.);
    return normalize(
    	k.xyy * scene(p + k.xyy * h) +
        k.yyx * scene(p + k.yyx * h) +
        k.yxy * scene(p + k.yxy * h) +
        k.xxx * scene(p + k.xxx * h)
    );
	*/
}

mat3 camera(vec3 ro, vec3 ta) {
    vec3 forward = normalize(ta - ro);
    vec3 side = normalize(cross(forward, vec3(0., 1., 0.)));
    vec3 up = normalize(cross(side, forward));
    return mat3(side, up, forward);
}

vec4 rayMarchFog(vec3 p, vec3 dir) {    
    float zStep = 16. / float(SAMPLE_COUNT);
    
    float transmittance = 1.;
    
    vec3 color = vec3(0.);    
    
    float densityScale = DENSITY_INTENSITY * zStep;
    float shadowSize = SHADOW_LENGTH / float(SHADOW_ITERATIONS);
    vec3 shadowScale = ABSORPTION_INTENSITY * shadowSize;
    vec3 shadowStep = sunDirection * shadowSize;    
    
    for(int i = 0; i < SAMPLE_COUNT; i++) {
    	float density = scene(p);
        
        if(density > EPS) {
            density = saturate(density * densityScale);
            
            #ifdef USE_DIRECTIONAL_LIGHT
            
            {
	            vec3 shadowPosition = p;
    	        float shadowDensity = 0.;
        	    for(int si = 0; si < SHADOW_ITERATIONS; si++) {
            	    float sp = scene(shadowPosition);
                	shadowDensity += sp;
                	shadowPosition += shadowStep;
            	}
	            vec3 attenuation = exp(-shadowDensity * shadowScale);
    	        vec3 attenuatedLight = lightColor * attenuation;
        	    color += cloudColor * attenuatedLight * transmittance * density;
            }
                
            #endif
            
            #ifdef USE_AMBIENT_LIGHT
            
            {
	            float shadowDensity = 0.;
    	        vec3 shadowPosition = p + ambientLightDir * .05;
        	    shadowDensity += scene(p) * .05;
            	shadowPosition = p + ambientLightDir * .1;
            	shadowDensity += scene(p) * .05;
            	shadowPosition = p + ambientLightDir * .2;
            	shadowDensity += scene(p) * .1;
            	float attenuation = exp(-shadowDensity * AMBIENT_INTENSITY);
            	vec3 attenuatedLight = vec3(ambientLightColor * attenuation);
            	color += cloudColor * attenuatedLight * transmittance * density;
            }
            
            #endif
            
            transmittance *= 1. - density;            
        }

        if(transmittance < EPS) {
        	break;
    	}
        
        p += dir * zStep;
        
    }
    
    //return color;
    return vec4(color, 1. - transmittance);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  	vec2 uv = (fragCoord.xy - iResolution.xy * .5) / min(iResolution.x, iResolution.y);
    vec2 mouse = (iMouse.xy - iResolution.xy * .5) / min(iResolution.x, iResolution.y);
    
    float rot = sin(iTime * .8) * .06;
    uv *= mat2(cos(rot), -sin(rot), sin(rot), cos(rot));

  	float fov = 1.2;
    vec3 f = vec3(0., 0., iTime);
    vec3 lookAt = vec3(
        cos(iTime * .4) * .4 + 0.,
        sin(iTime * .5) * .18 + 1.6,
        0.
    ) + f + vec3(mouse, 0.) * 1.;
    vec3 cameraPos = vec3(
        0.,
        2.35,
        2.
    ) + f;

  	// raymarch
  	vec3 rayOrigin = cameraPos;
  	vec3 rayDirection = camera(rayOrigin, lookAt) * normalize(vec3(uv, fov));

    vec4 color = vec4(vec3(0.), 0.);
    
    vec4 res = rayMarchFog(rayOrigin, rayDirection);
    color += res;
    
    vec3 bg = mix(
        vec3(.6, .3, .4),
        vec3(.9, .6, .4),
        smoothstep(-.6, .4, uv.y)
    );
    
    color.rgb += bg;
    
    fragColor = color;
}

`