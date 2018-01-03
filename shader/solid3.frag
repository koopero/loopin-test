#version 150
uniform vec3 colour = vec3( 0, 1, 0);

out vec4 OUT;
void main()
{
  OUT.rgb = colour;
  OUT.a = 1.0;
}
