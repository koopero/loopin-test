#include "ofxLoopin/src.glsl"

vec2 srcGridCoord( vec2 cell, vec2 coord ) {
  vec2 cells = vec2( srcCols, srcRows );
  coord /= cells;
  coord += cell / cells;
  return coord;
}


vec2 smartCubeCoord( vec3 normal ) {
  int col = 0;
  int row = 0;

  if ( normal.z > 0.0 ) { col = 0; row = 0; }
  if ( normal.x > 0.0 ) { col = 1; row = 0; }
  if ( normal.y > 0.0 ) { col = 2; row = 0; }

  if ( normal.z < 0.0 ) { col = 0; row = 1; }
  if ( normal.x < 0.0 ) { col = 1; row = 1; }
  if ( normal.y < 0.0 ) { col = 2; row = 1; }


  return vec2( col, row );
}

uniform sampler2D sideSampler; // GLSL Sampler
uniform mat4 sideMatrix;   // Matrix to use for texture. Currently unity.
uniform int sideCols;  // `cols` metadata from the texture's buffer.
uniform int sideRows; //  `rows` metadata from the texture's buffer.

#ifdef SHADER_TYPE_VERT
#include "ofxLoopin/vert.glsl"
out vec2 sideCoord;
void main()
{
  sideCoord = vec2(texcoord.x, texcoord.y);
  sideCoord = (sideMatrix*vec4(sideCoord.x,sideCoord.y,0,1)).xy;

  vec2 cell = smartCubeCoord( normal.xyz );

  srcCoord = srcGridCoord( cell, sideCoord );
  vertColour = vec4(1,1,1,1);

  gl_Position = modelViewProjectionMatrix * position;
}
#endif

#ifdef SHADER_TYPE_FRAG
in vec2 srcCoord;
in vec4 vertColour;
in vec2 sideCoord;


out vec4 OUT;
void main()
{
  OUT = texture(srcSampler, srcCoord) * texture(sideSampler, sideCoord);
  OUT *= vertColour;
}
#endif
