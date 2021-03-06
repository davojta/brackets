// start with return true / false
// start with the first case
// start with second case
// third case need to count closing / open brackets
// intruduce refactoring / stack
// 2.5 hours

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
  });

  let globalClose = true;
  let lastOpened = [];

  // const config2 = bracketsConfig[1].map((sign)=> {
  //   return { sign, count: 0 };
  // });

  const chars = str.split('');
  // console.log('chars', chars);
  

  const checkOpenBracket = (config, char) => {
    return (config[0].sign === char && config[1].count <= config[0].count);
    // return (config[0].sign === char && config[1].count === config[0].count);
  }

  const checkConfig = (configs, char) => {
    configs.forEach((bracketConfig) => {
      const config = bracketConfig.bracketConfig;
      const isPossibleToOpen = checkOpenBracket(config, char);
      const isOtherClosed = configs.every(config => config.closed);
      if (config[0].sign === lastOpened[0] && config[1].sign === char && (config[0].count - config[1].count) >= 1) {
        // console.log('checkConfig', char, config)
        config[1].count += 1; 
        lastOpened.shift();
        bracketConfig.closed = true;
      } else if (isPossibleToOpen) {
        // console.log('checkConfig', char, config)
        config[0].count += 1; 
        lastOpened.unshift(char);
        bracketConfig.closed = false;
      } else {
        if (config[1].sign === char) {
          globalClose = false
        }
      }
    });
  }

  chars.forEach(char => {
    // console.log('check char - ', char, ' ===')
    checkConfig(configs, char);
  });

  // console.log('configs', JSON.stringify(configs, 0, 2));

  return configs.every(config => config.closed) && globalClose;
}
