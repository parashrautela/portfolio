// GLSL shaders for the unrolling image (unchanged from the original component).

export const vertexShader = /* glsl */ `
uniform float time;
uniform float angle;
uniform float progress;
uniform float rolls;
uniform float rollRadius;
uniform vec4 resolution;
varying vec2 vUv;
varying float vFrontShadow;

const float pi = 3.14159265359;

// Rotation matrix around an axis
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
        oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
        0.0,                                0.0,                                0.0,                                1.0
    );
}

// Rotate a vector around an axis by angle
vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

void main() {
    vUv = uv;
    
    float finalAngle = angle;
    vec3 newposition = position;
    
    // Roll radius and count
    float rad = rollRadius;
    float rollCount = rolls;
    
    // Rotate to apply angle
    newposition = rotate(newposition - vec3(-0.5, 0.5, 0.0), vec3(0.0, 0.0, 1.0), -finalAngle) + vec3(-0.5, 0.5, 0.0);
    
    // Calculate offset based on position
    float offs = (newposition.x + 0.5) / (sin(finalAngle) + cos(finalAngle));
    float tProgress = clamp((progress - offs * 0.99) / 0.01, 0.0, 1.0);
    
    // Shadows for depth
    vFrontShadow = clamp((progress - offs * 0.95) / 0.05, 0.7, 1.0);
    
    // Create the roll shape
    newposition.z = rad + rad * (1.0 - offs / 2.0) * sin(-offs * rollCount * pi - 0.5 * pi);
    newposition.x = -0.5 + rad * (1.0 - offs / 2.0) * cos(-offs * rollCount * pi + 0.5 * pi);
    
    // Rotate back
    newposition = rotate(newposition - vec3(-0.5, 0.5, 0.0), vec3(0.0, 0.0, 1.0), finalAngle) + vec3(-0.5, 0.5, 0.0);
    
    // Unroll animation
    newposition = rotate(newposition - vec3(-0.5, 0.5, rad), vec3(sin(finalAngle), cos(finalAngle), 0.0), -pi * progress * rollCount);
    newposition += vec3(
        -0.5 + progress * cos(finalAngle) * (sin(finalAngle) + cos(finalAngle)), 
        0.5 - progress * sin(finalAngle) * (sin(finalAngle) + cos(finalAngle)),
        rad * (1.0 - progress / 2.0)
    );
    
    // Mix between rolled and unrolled based on progress
    vec3 finalposition = mix(newposition, position, tProgress);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;

varying vec2 vUv;
varying float vFrontShadow;

// Get image UV with object-fit: cover behavior
vec2 get_img_uv() {
    // Start from mesh UV and center
    vec2 uv = vUv - 0.5;
    
    // Apply object-fit: cover mapping
    // resolution.z = a1, resolution.w = a2 (aspect corrections for cover)
    uv *= resolution.zw;
    
    return uv + 0.5;
}

void main() {
    vec2 img_uv = get_img_uv();
    
    vec4 color = texture2D(texture1, img_uv);
    
    // Apply shadow for 3D depth effect
    color.rgb *= vFrontShadow;
    
    // Alpha controlled by progress - no frame masking so unrolling edges are visible
    color.a = clamp(progress * 5.0, 0.0, 1.0);
    
    gl_FragColor = color;
}
`;
