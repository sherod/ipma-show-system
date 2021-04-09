const juniorCategories = [
  { code: "", name: "Junior Categories" },
  { code: "J.1", name: "1. Aircraft All Scales" },
  { code: "J.2", name: "2. Military Vehicles All Scales" },
  { code: "J.3", name: "3. Civilian Vehicles All Scales" },
  { code: "J.4", name: "4. Dioramas All Scales" },
  { code: "J.5", name: "5. Science Fiction All Scales" },
  { code: "J.6", name: "6. Figures All Scales" },
  { code: "J.7", name: "7. Maritime Vehicles All Scales" },
  { code: "J.8", name: "8. Warhammer All Scales" },
  { code: "J.9", name: "9. Open/Scratchbuilt All Scales" },
];

const seniorCategories = [
  { code: "", name: "Senior Categories" },
  { code: "S.1", name: "1. MARITIME VESSEL - (SURFACE)   ALL SCALES" },
  { code: "S.2", name: "2. SUBMARINES   ALL SCALES" },
  { code: "S.3", name: "3. CIVILIAN VEHICLES STREET    ALL SCALES" },
  { code: "S.4", name: "4. CIVILIAN MOTORSPORT   ALL SCALES" },
  { code: "S.5", name: "5. TRUCKS Light Commercial   ALL SCALES" },
  { code: "S.6", name: "6. TRUCKS Heavy Commercial   ALL SCALES" },
  { code: "S.7", name: "7. MOTOR CYCLES   ALL SCALES" },
  { code: "S.8", name: "8. FIGURES   54mm and smaller" },
  { code: "S.9", name: "9. FIGURES   55mm and larger" },
  { code: "S.10", name: "10. VIGNETTES   ALL SCALES" },
  { code: "S.11", name: "11. DIORAMAS   ALL SCALES" },
  { code: "S.12", name: "12. AIRCRAFT 1900 to 1921   1/72 and smaller" },
  { code: "S.13", name: "13. AIRCRAFT 1900 to 1921   1/48 Scale" },
  { code: "S.14", name: "14. AIRCRAFT 1900 to 1921   1/32 and larger" },
  { code: "S.15", name: "15. AIRCRAFT (ALLIED) 1922 to 1945   1/72 Scale" },
  { code: "S.16", name: "16. AIRCRAFT (AXIS) 1922 TO 1945   1/72 Scale" },
  { code: "S.17", name: "17. AIRCRAFT 1922 to    1/144 Scale" },
  { code: "S.18", name: "18. AIRCRAFT (JETS) 1946 to present   1/72 Scale" },
  {
    code: "S.19",
    name: "19. AIRCRAFT (PROPS / JETS) 1946 to present   1/144 Scale",
  },
  { code: "S.20", name: "20. AIRCRAFT (PROPS) 1946 to present   1/72 Scale" },
  { code: "S.21", name: "21. AIRCRAFT (AXIS) 1922 to 1945   1/48 Scale" },
  { code: "S.22", name: "22. AIRCRAFT (ALLIED) 1922 to 1945   1/48 Scale" },
  { code: "S.23", name: "23. AIRCRAFT (JETS) 1946 to present   1/48 Scale" },
  { code: "S.24", name: "24. AIRCRAFT (PROPS) 1946 to present   1/48 Scale" },
  {
    code: "S.25",
    name: "25. AIRCRAFT (JETS) 1940 to present   1/32 and larger",
  },
  {
    code: "S.26",
    name: "26. AIRCRAFT (PROPS) 1922 to present   1/32 and larger",
  },
  {
    code: "S.27",
    name: "27. CIVILIAN AIRCRAFT (includes AIRLINERS)   ALL SCALES",
  },
  { code: "S.28", name: "28. HELICOPTERS   ALL SCALES" },
  {
    code: "S.29",
    name: "29. MILITARY VEHICLES - 1900 to 1945   1/72 and smaller",
  },
  {
    code: "S.30",
    name: "30. MILITARY VEHICLES 1946 to present   1/72 and smaller",
  },
  {
    code: "S.31",
    name: "31. MILITARY VEHICLES - 1900 to present   1/56 and 1/48 Scale",
  },
  {
    code: "S.32",
    name: "32. MILITARY VEHICLES (AXIS) - 1900 to 1945   1/35 and larger",
  },
  {
    code: "S.33",
    name: "33. MILITARY VEHICLES (ALLIED) - 1900 to 1945   1/35 and larger",
  },
  {
    code: "S.34",
    name: "34. MILITARY VEHICLES - 1946 to present   1/35 and larger",
  },
  {
    code: "S.35",
    name: "35. MILITARY VEHICLES 1900 to present   1/25 and larger",
  },
  { code: "S.36", name: "36. SPACECRAFT/VEHICLES NON FICTION   ALL SCALES" },
  {
    code: "S.37",
    name:
      "37. MOVIES, SCIENCE FICTION VEHICLES (including SPACECRAFT)   ALL SCALES",
  },
  { code: "S.38", name: "38. STAR WARS VEHICLES AND FIGURES   ALL SCALES" },
  {
    code: "S.39",
    name: "39. MOVIES, SCIENCE FICTION AND FANTASY FIGURES   ALL SCALES",
  },
  { code: "S.40", name: "40. WARHAMMER   ALL SCALES" },
  { code: "S.41", name: "41. OPEN / SCRATCHBUILT   ALL SCALES" },
  { code: "S.45", name: "45. AUSTRALIAN AFVs   12785" },
  { code: "S.46", name: "46. EGG MODELS ALL TYPES   ALL SCALES" },
  { code: "S.47", name: "47. The Airfix Cup" },
  { code: "S.48", name: "48. The Panzer Tracks Trophy" },
];

function CategoryName(props) {
  let category;

  if (props.categoryNumber.startsWith("S")) {
    category = seniorCategories.find(
      (element) => element.code === props.categoryNumber
    );
  } else {
    category = juniorCategories.find(
      (element) => element.code === props.categoryNumber
    );
  }

  return category !== undefined ? category.name : "Unknown Category";
}

export function validCategoryList(age) {
  console.log(age);
  if (age === undefined || age === null || age > 16) {
    return seniorCategories;
  } else {
    return juniorCategories;
  }
}

export default CategoryName;
