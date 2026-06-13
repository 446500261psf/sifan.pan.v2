#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uBase;
uniform sampler2D uNormal;
uniform sampler2D uHeight;
uniform sampler2D uReveal;
uniform vec3 uBgColor;
uniform vec2 uTexel;
uniform float uAspect;

void main() {
  vec2 uv = vUv;
  float alpha = texture(uBase, uv).a;
  if (alpha < 0.01) discard;

  float spread = 3.0;
  float hL = texture(uHeight, uv - vec2(uTexel.x * spread, 0.0)).r;
  float hR = texture(uHeight, uv + vec2(uTexel.x * spread, 0.0)).r;
  float hU = texture(uHeight, uv + vec2(0.0, uTexel.y * spread)).r;
  float hD = texture(uHeight, uv - vec2(0.0, uTexel.y * spread)).r;
  vec3 formNormal = normalize(vec3((hL - hR) * 2.0, (hD - hU) * 2.0, 0.26));

  vec3 detail = texture(uNormal, uv).rgb * 2.0 - 1.0;
  detail.xy *= 0.3;
  detail.z = max(detail.z, 0.44);
  detail = normalize(detail);
  vec3 nmap = normalize(mix(formNormal, detail, 0.32));

  vec3 lightDir = normalize(vec3(0.44, -0.38, 0.84));
  float key = dot(nmap, lightDir);
  float lit = pow(clamp((key + 0.30) / 1.30, 0.0, 1.0), 0.62);

  float shadow = pow(1.0 - lit, 1.12);
  float shade = 1.0 - shadow * 0.30;
  vec3 relief = uBgColor * shade;

  vec3 base = texture(uBase, uv).rgb;
  float reveal = texture(uReveal, uv).r;
  float revealMix = reveal > 0.055 ? smoothstep(0.10, 0.92, reveal) : 0.0;
  vec3 color = mix(relief, base, revealMix);

  outColor = vec4(color, alpha);
}
