// start with return true / false
// start with the first case
// start with second case
// third case need to count closing / open brackets

module.exports = function check(str, bracketsConfig) {
  // const config1 = [['(', ')']];
  // const config2 = [['(', ')'], ['[', ']']];

  const configs = bracketsConfig.map((bracketConfig) => {
    return {
      bracketConfig: bracketConfig.map((sign)=> {
        return { sign, count: 0 };
      }),
      closed: true
    };
  })

  // const config2 = bracketsConfig[1].map((sign)=> {
  //   return { sign, count: 0 };
  // });

  const chars = str.split('');

  const checkConfig = (configs, char) => {
    configs.forEach((bracketConfig) => {
      const config = bracketConfig.bracketConfig;
      if (config[0].sign === char && config[1].count === config[0].count) {
        config[0].count += 1; 
        bracketConfig.closed = false;
      }
      if (config[1].sign === char && (config[0].count - config[1].count) === 1) {
        config[1].count += 1; 
        bracketConfig.closed = true;
      }
    });
  }

  chars.forEach(char => {
    checkConfig(configs, char);
  });

  console.log('configs', JSON.stringify(configs, 0,2));

  return configs.every(config => config.closed);
}
