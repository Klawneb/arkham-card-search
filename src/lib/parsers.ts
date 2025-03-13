const iconPaths: { [key: string]: string } = {
  action: "icons\\action.svg",
  agility: "icons\\agility.svg",
  auto_fail: "icons\\auto_fail.svg",
  bless: "icons\\bless.svg",
  combat: "icons\\combat.svg",
  cultist: "\\icons\\cultist.svg",
  curse: "icons\\curse.svg",
  elder_sign: "icons\\elder_sign.svg",
  elder_thing: "icons\\elder_thing.svg",
  free: "icons\\free.svg",
  guardian: "icons\\guardian.svg",
  intellect: "icons\\intellect.svg",
  investigator: "icons\\investigator.svg",
  mystic: "icons\\mystic.svg",
  reaction: "icons\\reaction.svg",
  rogue: "icons\\rogue.svg",
  seeker: "icons\\seeker.svg",
  skull: "icons\\skull.svg",
  survivor: "icons\\survivor.svg",
  tablet: "icons\\tablet.svg",
  wild: "icons\\wild.svg",
  willpower: "icons\\willpower.svg",
};

export function parseCardText(text: string) {
  let newText = text;
  newText = parseIcons(newText);
  newText = replaceDoubleBrackets(newText);
  return newText.replace(/\n/g, "<br><br>");
}

function replaceDoubleBrackets(text: string) {
  return text.replace(/\[\[(.*?)\]\]/g, "<b>$1</b>");
}

function parseIcons(text: string) {
  const iconRegex = /\[([^\]]+)\]/g;
  const parts = text.split(iconRegex);
  let newText = text;

  parts.forEach((part) => {
    if (iconPaths[part]) {
      newText = newText.replace(
        `[${part}]`,
        `<Image src=${iconPaths[part]} className="w-10 h-10 inline-flex align-middle"/>`
      );
    }
  });

  return newText;
}
