import React from "react";

const social_links = [
   {
    link: "https://www.instagram.com/Kravelab.in",
    target: "_blank",
    icon: "fa-brands fa-instagram",
    name: "Instagram",
  },
  {
    link: "http://facebook.com",
    target: "_blank",
    icon: "fa-brands fa-facebook-f",
    name: "Facebook",
  },
  {
    link: "http://twitter.com",
    target: "_blank",
    icon: "fa-brands fa-twitter",
    name: "Twitter",
  },
];


const SocialLinks = () => {
  return (
    <>
      {social_links.map((l, i) => (
        <a key={i} href={l.link} target={l.target}>
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
};

export default SocialLinks;


export function SocialShare() {
  return (
    <>
      {social_links.slice(0, 3).map((l, i) => (
        <a key={i} href={l.link} target={l.target}>
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
}
