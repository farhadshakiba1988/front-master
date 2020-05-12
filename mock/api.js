import mockjs from 'mockjs';

const titles = [
  'کتاب',
  'پروژه',
  'زیبا',
  'حرفه ای',
  'سریع',
  'انعطاف پذیر',
  'ساده',
  'کامل',
];
const avatars = [
  '/icons/01.png', //
  '/icons/02.png', //
  '/icons/03.png', //
  '/icons/04.png', //
  '/icons/05.png', //
  '/icons/06.png', //
  '/icons/07.png', //
  '/icons/08.png', //
];

const avatars2 = [
  '/images/avatar/01.jpg',
  '/images/avatar/02.jpg',
  '/images/avatar/03.jpg',
  '/images/avatar/04.jpg',
  '/images/avatar/05.jpg',
  '/images/avatar/06.jpg',
  '/images/avatar/07.jpg',
  '/images/avatar/08.jpg',
  '/images/avatar/01.jpg',
  '/images/avatar/02.jpg',
];

const covers = [
  '/images/01.jpg',
  '/images/02.jpg',
  '/images/03.jpg',
  '/images/04.jpg',
];

const desc = [
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ',
  'کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد',
  'در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل',
  'حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود ',
  'برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
];

const user = [
  'علی محسنی ',
  'فرزاد یکتا',
  'امید اکبری',
  'سعید سلطانی',
  'سهیل شادمان',
  'محمد رضایت',
  'شادی شیرازی',
  'الناز فخاری',
  'زهرا سهیلی',
  'جواد ذکاوت',
];

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://a.b.com',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ',
      members: [
        {
          avatar: '/public/images/list-card.png',
          name: 'علی محسنی',
          id: 'member1',
        },
        {
          avatar: '/public/images/list-card.png',
          name: 'پیام صبری',
          id: 'member2',
        },
        {
          avatar: '/public/images/list-card.png',
          name: 'مهدی صدر',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case 'post':
      result.unshift({
        body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    updatedAt: new Date('1398-10-10'),
    member: 'محسن ریخته گر',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    updatedAt: new Date('1398-07-24'),
    member: 'شهاب اوسیوند',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    updatedAt: new Date(),
    member: 'مهسا آقایی',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    updatedAt: new Date('1398-07-23'),
    member: 'فاطمه بزرگمهر',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    updatedAt: new Date('1398-07-23'),
    member: 'ترانه خدابنده',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    updatedAt: new Date('1398-07-23'),
    member: 'ایمان زارع',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: 'علی اوجی',
      avatar: avatars2[0],
    },
    group: {
      name: 'گروه دوم',
      link: '',
    },
    project: {
      name: 'پروژه سوم',
      link: '',
    },
    template: 'از @{group} برای @{project}',

  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '',
      avatar: avatars2[1],
    },
    group: {
      name: 'گروه اول',
      link: '',
    },
    project: {
      name: 'پروژه سوم',
      link: '',
    },
    template: 'از @{group} برای @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '',
      avatar: avatars2[2],
    },
    group: {
      name: 'علی اوجی',
      link: '',
    },
    project: {
      name: 'گروه چهارم',
      link: '',
    },
    template: 'از @{group} برای @{project}',

  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: 'کاربر پنجم',
      avatar: avatars2[4],
    },
    project: {
      name: 'پروژه دوم',
      link: '',
    },
    template: 'از @{user} برای @{project}',

  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '',
      avatar: avatars2[3],
    },
    project: {
      name: '',
      link: '',
    },
    comment: {
      name: '',
      link: '',
    },
    template: 'از @{comment} برای @{project}',

  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '',
      avatar: avatars2[5],
    },
    group: {
      name: '',
      link: '',
    },
    project: {
      name: '',
      link: '',
    },
    template: 'از @{group} برای @{project}',

  },
];

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/captcha': getFakeCaptcha,
};
