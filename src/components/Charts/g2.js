// 全局 G2 设置
import { track, setTheme } from 'bizcharts';

track(false);

const config = {
  defaultColor: '#ff7b37',
  shape: {
    interval: {
      fillOpacity: 1,
    },
  },
};

setTheme(config);
