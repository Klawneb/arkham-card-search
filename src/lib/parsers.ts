const iconPaths: { [key: string]: string } = {
  action: "src\\assets\\icons\\action.svg",
  agility: "src\\assets\\icons\\agility.svg",
  auto_fail: "src\\assets\\icons\\auto_fail.svg",
  bless: "src\\assets\\icons\\bless.svg",
  combat: "src\\assets\\icons\\combat.svg",
  cultist: "src\\assets\\icons\\cultist.svg",
  curse: "src\\assets\\icons\\curse.svg",
  elder_sign: "src\\assets\\icons\\elder_sign.svg",
  elder_thing: "src\\assets\\icons\\elder_thing.svg",
  free: "src\\assets\\icons\\free.svg",
  guardian: "src\\assets\\icons\\guardian.svg",
  intellect: "src\\assets\\icons\\intellect.svg",
  investigator: "src\\assets\\icons\\investigator.svg",
  mystic: "src\\assets\\icons\\mystic.svg",
  reaction: "src\\assets\\icons\\reaction.svg",
  rogue: "src\\assets\\icons\\rogue.svg",
  seeker: "src\\assets\\icons\\seeker.svg",
  skull: "src\\assets\\icons\\skull.svg",
  survivor: "src\\assets\\icons\\survivor.svg",
  tablet: "src\\assets\\icons\\tablet.svg",
  wild: "src\\assets\\icons\\wild.svg",
  willpower: "src\\assets\\icons\\willpower.svg",
};

export function parseCardText(text: string) {
  let newText = text;
  newText = parseIcons(newText);
  return newText.replace(/\n/g, "<br><br>");
}

function parseIcons(text: string) {
  const iconRegex = /\[([^\]]+)\]/g;
  const parts = text.split(iconRegex);
  let newText = text;

  parts.forEach((part) => {
    if (iconPaths[part]) {
      newText = newText.replace(`[${part}]`, `<Image src=${iconPaths[part]} className="w-10 h-10 inline-flex align-middle"/>`);
    }
  });

  return newText;
}
