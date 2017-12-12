#version 150
uniform float red = 0.0;
uniform float green = 0.0;
uniform float blue = 0.0;
uniform float alpha = 1.0;

out vec4 OUT;
void main()
{
  OUT.r = red;
  OUT.g = green;
  OUT.b = blue;
  OUT.a = alpha;
}
