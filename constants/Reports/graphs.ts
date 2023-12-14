import colors from '@/assets/colors';

const randomColors = [
  `${colors.activeBlue400}`,
  `${colors.activeBlue600}`,
  `${colors.primaryRed500}`,
  `${colors.activeGreen400}`,
];

function getRandomColor(color: Array<string>) {
  const randomIndex = Math.floor(Math.random() * color.length);
  const item = color[randomIndex];

  return item;
}

export const doughnutData = [
  ['Task', 'Hours per Day'],
  ['Eat', 7],
  ['Work', 5],
  ['Commute', 3],
];

export const doughnutOptions = {
  pieHole: 0.6,
  is3D: false,
  pieSliceText: 'none',
  pieStartAngle: 185,
  tooltip: { trigger: 'none' },
  chartArea: { left: 50, top: 30 },
  height: 330,
  slices: {
    0: { color: `${colors.activeBlue400}` },
    1: { color: `${colors.primaryBlue200}` },
    2: { color: `${colors.primaryRed400}` },
  },
};

export const baroptions = {
  trendlines: {
    0: {
      type: 'linear',
      color: 'red',
      lineWidth: 3,
      opacity: 1,
      showR2: true,
      visibleInLegend: true,
    },
  },
  legend: 'none',
  fontSize: 12,
  fontName: 'Averta Regular',
  height: 330,
  chartArea: { left: 40, top: 30 },
  bar: {
    groupWidth: 60,
  },
  vAxis: {
    gridlines: {
      color: `${colors.neutral300}`,
    },
    minorGridlines: {
      // hides the minor grid lines
      minSpacing: 50,
      count: -1,
    },
  },
};

const getColor = getRandomColor(randomColors);

export const bardata = [
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, `${getColor}`], // RGB value
  ['Silver', 10.49, `${getColor}`], // English color name
  ['Gold', 19.3, `${getColor}`],
  ['Platinum', 21.45, `${getColor}`],
];

export const linedata = [
  ['Place', 'Sales', 'Expenses'],
  ['Ajah', 1000, 400],
  ['Surulere', 1170, 460],
  ['VI', 660, 1120],
  ['Yaba', 1030, 540],
  ['Somolu', 1030, 540],
  ['Staff Current', 1030, 540],
  ['Gbagada', 1030, 540],
  ['Igando', 130, 540],
  ['Orile', 230, 540],
  ['Lekki', 430, 540],
  ['Others', 630, 540],
];

export const linedatav2 = [
  ['Place', 'Sales'],
  ['Ajah', 1000],
  ['Surulere', 1170],
  ['VI', 660],
  ['Yaba', 1030],
  ['Somolu', 1030],
  ['Staff Current', 1030],
  ['Gbagada', 1030],
  ['Igando', 130],
  ['Orile', 230],
  ['Lekki', 430],
  ['Others', 630],
];

export const lineOptions = {
  isStacked: true,
  chartArea: { left: 40, top: 30 },
  legend: 'none',
  fontSize: 12,
  fontName: 'Averta Regular',
  colors: [`${colors.blueLine}`, `${colors.greenLine}`],
  height: 300,
  vAxis: {
    minValue: 0,
    gridlines: {
      color: `${colors.neutral300}`,
    },
    minorGridlines: {
      // hides the minor grid lines
      minSpacing: 50,
      count: -1,
    },
  },
};
