import analysis from './fa/analysis';
import exception from './fa/exception';
import form from './fa/form';
import globalHeader from './fa/globalHeader';
import login from './fa/login';
import menu from './fa/menu';
import monitor from './fa/monitor';
import result from './fa/result';
import settingDrawer from './fa/settingDrawer';
import settings from './fa/settings';
import pwa from './fa/pwa';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.home.introduce': 'introduce',
  'app.forms.basic.title': 'فرم ساده',
  'app.forms.basic.description':
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settings,
  ...pwa,
};
