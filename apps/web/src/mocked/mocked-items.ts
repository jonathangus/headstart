import { PostEntity } from 'shared-types';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';
import image6 from './image6.png';


export const mockedItems: PostEntity[] = [
  {
    image: image1.src,
    title:
      'Lenstagram brand identity',
    handle: 'heavydevbehance.lens',
    mocked: true,
    postId: '1',
    service: 'Behance',
  },
  {
    image: image2.src,
    title:
      'Train ride galore WebGL',
    handle: 'gruvanspline.lens',
    mocked: true,
    postId: '2',
    service: 'spline',
  },
  {
    image: image3.src,
    title:
      'onchain summer LENSTHREADS',
    handle: 'zuckyberrydribble.lens',
    mocked: true,
    postId: '3',
    service: 'dribbble',
  },
  {
    image: image4.src,
    title:
      'NOUNS ⌐◨-◨ AI concept',
    handle: 'Weirdcreatordribbble.lens',
    mocked: true,
    postId: '4',
    service: 'dribbble',
  },
  {
    image: image5.src,
    title:
      'Yerbie framer motion animation',
    handle: 'Gerbitcodepen.lens',
    mocked: true,
    postId: '5',
    service: 'Codepen',
  },
  {
    image: image6.src,
    title:
      'Windows98 CSS Library',
    handle: 'Mrballmercodebox.lens',
    mocked: true,
    postId: '6',
    service: 'codebox',
  },
];
