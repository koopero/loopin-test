const hypnotoad =
 '               ,\'``.._   ,\'``.\n'
+'              :,--._:)\\,:,._,.:       All Glory to\n'
+'              :`--,\'\'   :`...\';\\      the HYPNO TOAD!\n'
+'               `,\'       `---\'  `.\n'
+'               /                 :\n'
+'              /                   \\\n'
+'            ,\'                     :\\.___,-.\n'
+'           `...,---\'``````-..._    |:       \\\n'
+'             (                 )   ;:    )   \\  _,-.\n'
+'              `.              (   //          `\'    \\\n'
+'               :               `.//  )      )     , ;\n'
+'             ,-|`.            _,\'/       )    ) ,\' ,\'\n'
+'            (  :`.`-..____..=:.-\':     .     _,\' ,\'\n'
+'             `,\'\\ ``--....-)=\'    `._,  \\  ,\') _ \'``._\n'
+'          _.-/ _ `.       (_)      /     )\' ; / \\ \\`-.\'\n'
+'         `--(   `-:`.     `\' ___..\'  _,-\'   |/   `.)\n'
+'             `-. `.`.``-----``--,  .\'\n'
+'               |/`.\\`\'        ,\',\'); SSt\n'
+'                   `         (/  (/'

require('../index').test( 'osd-test', async function ( loopin ) {
  await loopin.patch( hypnotoad, 'osd/text' )
  await loopin.testDelay()
  await loopin.patch( "", 'osd/text' )
  await loopin.patch( "server can write this string", 'osd/server' )
  await loopin.testDelay()
  await loopin.patch( "disabling after testDelay", 'osd/text' )
  await loopin.testDelay()
  await loopin.patch( { enabled: false }, 'osd' )
  await loopin.testDelay()
} )
