#version 150
uniform int rgb = 0x000000;

out vec4 OUT;
void main()
{
  OUT.r = float((rgb >> 16) & 0xff) / 255.0;
  OUT.g = float((rgb >> 8 ) & 0xff) / 255.0;
  OUT.b = float((rgb >> 0 ) & 0xff) / 255.0;
  OUT.a = 1.0;
}
