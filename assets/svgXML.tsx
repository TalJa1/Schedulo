/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React from 'react';
import {SvgXml} from 'react-native-svg';

export const test = (w?: any, h?: any, color?: any) => {
  const xml = ``;

  return <SvgXml xml={xml} width={w} height={h} />;
};

export const homeIcon = (w?: any, h?: any, color?: any) => {
  const xml = `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 2H22.5M6 8H22.5M6 14H22.5M1.5 2V2.01499M1.5 8V8.01499M1.5 14V14.015" stroke=${
    color ?? 'white'
  } style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  return <SvgXml xml={xml} width={w} height={h} />;
};

export const clockIcon = (w?: any, h?: any, color?: any) => {
  const xml = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 9V15L18 18M15 1.5C7.54416 1.5 1.5 7.54416 1.5 15C1.5 22.4558 7.54416 28.5 15 28.5C22.4558 28.5 28.5 22.4558 28.5 15C28.5 12.2398 27.6717 9.67315 26.25 7.53496" stroke=${
    color ?? 'white'
  } style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  return <SvgXml xml={xml} width={w} height={h} />;
};

export const docsIcon = (w?: any, h?: any, color?: any) => {
  const xml = `<svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 17.5H14.5M8.5 23.5H17.5M14.6071 1.7939V8.25001C14.6071 9.90687 15.9503 11.25 17.6071 11.25H24.0242M14.6071 1.7939C14.0961 1.76425 13.5607 1.75 13 1.75C4.39706 1.75 1.75 5.10294 1.75 16C1.75 26.8971 4.39706 30.25 13 30.25C21.6029 30.25 24.25 26.8971 24.25 16C24.25 14.2219 24.1795 12.6446 24.0242 11.25M14.6071 1.7939L24.0242 11.25" stroke=${
    color ?? 'white'
  } style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  return <SvgXml xml={xml} width={w} height={h} />;
};

export const cupIcon = (w?: any, h?: any, color?: any) => {
  const xml = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 1.5C8.01472 1.5 6 3.51472 6 6V15C6 19.9706 10.0294 24 15 24C19.9706 24 24 19.9706 24 15V6C24 3.51472 21.9853 1.5 19.5 1.5H10.5Z" stroke=${
    color ?? 'white'
  } style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  return <SvgXml xml={xml} width={w} height={h} />;
};
