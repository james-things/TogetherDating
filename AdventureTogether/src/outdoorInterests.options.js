// Description: multiple permutations of user interest selection data

export const optionOutdoor = [
  { value: 'Animals', label: 'Animals' },
  { value: 'Bicycling', label: 'Bicycling' },
  { value: 'Boarding/Skiing', label: 'Boarding/Skiing' },
  { value: 'Boating Large', label: 'Boating Large' },
  { value: 'Boating Small', label: 'Boating Small' },
  { value: 'Camping', label: 'Camping' },
  { value: 'Climbing', label: 'Climbing' },
  { value: 'Fishing', label: 'Fishing' },
  { value: 'Flying', label: 'Flying' },
  { value: 'Hunting', label: 'Hunting' },
  { value: 'Motor Sports', label: 'Motor Sports' },
  { value: 'Restoration/Conservation', label: 'Restoration/Conservation' },
  { value: 'Shooting', label: 'Shooting' },
  { value: 'Swimming', label: 'Swimming' },
  { value: 'Team', label: 'Team' },
  { value: 'Walking/Running', label: 'Walking/Running' },
  { value: 'Combined', label: 'Combined' },
  { value: 'Other', label: 'Other' },
];

export const optionAnimal = {
  name: 'Animals',
  options: ['Animal Lover. Any', 'Dogs', 'Dog, Hunting', 'Dog Sledding', 'Farm Animals', 'Herding', 'Horse'],
  selections: [0, 0, 0, 0, 0, 0, 0],
};

export const optionBicycling = {
  name: 'Cycling',
  options: ['Biking, Any', 'Biking, BMX', 'Biking, Mountain', 'Cycling, Road', 'Cycling, Winter'],
  selections: [0, 0, 0, 0, 0],
};

export const optionBoardingSkiing = {
  name: 'Boarding/Skiing',
  options: ['Boarding, Any', 'Board-sailing', 'Skiing, Alpine', 'Skiing, Cross Country', 'Skateboarding', 'Sledding', 'Snowboarding', 'Snowshoeing'],
  selections: [0, 0, 0, 0, 0, 0, 0, 0],
};

export const optionLargeBoat = {
  name: 'Boating (Large)',
  options: ['Large Boat, Any', 'Sailing', 'Motor-boating', 'Yachting'],
  selections: [0, 0, 0, 0],
};

export const optionSmallBoating = {
  name: 'Boating (Small)',
  options: ['Small Boat, Any', 'Canoeing', 'Kayak, Recreational', 'Kayak, Sea/Tour', 'Kayak, White Water', 'Kayak, Fishing', 'Rafting', 'Stand-up Paddling', 'Surfing', 'Wake-boarding'],
  selections: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export const optionCamping = {
  name: 'Camping',
  options: ['Camping, Any', 'Bonfire', 'Camping, RV', 'Camping, local'],
  selections: [0, 0, 0, 0],
};

export const optionClimbing = {
  name: 'Climbing',
  options: ['Climbing, Any', 'Climbing, Sport', 'Climbing, Indoor', 'Climbing, Mountain', 'Climbing, Tree', 'Rappelling'],
  selections: [0, 0, 0, 0, 0, 0],
};

export const optionFishing = {
  name: 'Fishing',
  options: ['Fishing, Any', 'Fishing, Deep Water', 'Fishing, Freshwater', 'Fishing, Saltwater', 'Fishing, Ice'],
  selections: [0, 0, 0, 0, 0],
};

export const optionFlying = {
  name: 'Flying',
  options: ['Flying, Drones/RC', 'Flying, Airplane', 'Flying, Gliding', 'Kiting'],
  selections: [0, 0, 0, 0],
};

export const optionHunting = {
  name: 'Hunting',
  options: ['Hunting, Any', 'Hunting, Bow', 'Hunting, Handgun', 'Hunting, Rifle', 'Hunting, Shotgun', 'Trapping'],
  selections: [0, 0, 0, 0, 0, 0],
};

export const optionMotorSports = {
  name: 'Motor Sports',
  options: ['Motor Sports, Any', 'ATV / 4-wheeling', 'Dirt-biking', 'Jet-skiing', 'Off-road Trucking', 'Snowmobiling'],
  selections: [0, 0, 0, 0, 0, 0],
};

export const optionRestorationConservation = {
  name: 'Nature',
  options: ['Conservation, Any', 'Restoration, Any', 'Birdwatching', 'Picking/Foraging', 'Gardening', 'Restoration', 'Volunteer', 'Wildlife Viewing'],
  selections: [0, 0, 0, 0, 0, 0, 0, 0],
};

export const optionShooting = {
  name: 'Shooting',
  options: ['Shooting, Any', 'Archery', 'Shooting, Target', 'Shooting, Trap', 'Paintball'],
  selections: [0, 0, 0, 0, 0],
};

export const optionSwimming = {
  name: 'Swimming',
  options: ['Diving', 'Scuba', 'Snorkeling', 'Sunbathing', 'Swimming, Any', 'Swimming, Wild', 'Swimming, Pool'],
  selections: [0, 0, 0, 0, 0, 0, 0],
};

export const optionTeam = {
  name: 'Team Sports',
  options: ['Team, Any', 'Field Sports', 'Frisbee', 'Sport, Playing', 'Sport, Spectator', 'Team Building', 'Ultimate', 'Volleyball'],
  selections: [0, 0, 0, 0, 0, 0, 0, 0],
};

export const optionWalkRun = {
  name: 'Walking/Running',
  options: ['Walk / Run, Any', 'Run, Jog', 'Run, Trail', 'Hiking, Day', 'Beach Combing', 'Triathlon', 'Adventure Racing'],
  selections: [0, 0, 0, 0, 0, 0, 0],
};

export const optionLeisureOther = {
  name: 'Leisure',
  options: ['Astronomy', 'Golf', 'Photography', 'Painting', 'Travel'],
  selections: [0, 0, 0, 0],
};

export const optionAllCombined = [
  {
    label: 'Animals',
    options: [
      { value: 'Animal Lover. Any', label: 'Animal Lover. Any' },
      { value: 'Dogs', label: 'Dogs' },
      { value: 'Dog, Hunting', label: 'Dog, Hunting' },
      { value: 'Dog Sledding', label: 'Dog Sledding' },
      { value: 'Farm Animals', label: 'Farm Animals' },
      { value: 'Herding', label: 'Herding' },
      { value: 'Horse', label: 'Horse' },
    ],
  },
  {
    label: 'Cycling',
    options: [
      { value: 'Biking, Any', label: 'Biking, Any' },
      { value: 'Biking, BMX', label: 'Biking, BMX' },
      { value: 'Biking, Mountain', label: 'Biking, Mountain' },
      { value: 'Cycling, Road', label: 'Cycling, Road' },
      { value: 'Cycling, Winter', label: 'Cycling, Winter' },
    ],
  },
  {
    label: 'Boarding/Skiing',
    options: [
      { value: 'Boarding, Any', label: 'Boarding, Any' },
      { value: 'Board-sailing/Windsurfing', label: 'Board-sailing/Windsurfing' },
      { value: 'Skiing, Alpine', label: 'Skiing, Alpine' },
      { value: 'Skiing, Cross Country', label: 'Skiing, Cross Country' },
      { value: 'Skateboarding', label: 'Skateboarding' },
      { value: 'Sledding', label: 'Sledding' },
      { value: 'Snowboarding', label: 'Snowboarding' },
      { value: 'Snowshoeing', label: 'Snowshoeing' },
    ],
  },
  {
    label: 'Boating (Large)',
    options: [
      { value: 'Large Boat, Any', label: 'Large Boat, Any' },
      { value: 'Sailing', label: 'Sailing' },
      { value: 'Motor-boating', label: 'Motor-boating' },
      { value: 'Yachting', label: 'Yachting' },
    ],
  },
  {
    label: 'Boating (Small)',
    options: [
      { value: 'Small Boat, Any', label: 'Small Boat, Any' },
      { value: 'Canoeing', label: 'Canoeing' },
      { value: 'Kayaking, Recreational', label: 'Kayaking, Recreational' },
      { value: 'Kayaking, Sea/Tour', label: 'Kayaking, Sea/Tour' },
      { value: 'Kayaking, White Water', label: 'Kayaking, White Water' },
      { value: 'Kayaking, Fishing', label: 'Kayaking, Fishing' },
      { value: 'Rafting', label: 'Rafting' },
      { value: 'Stand-up Paddling', label: 'Stand-up Paddling' },
      { value: 'Surfing', label: 'Surfing' },
      { value: 'Wake-boarding', label: 'Wake-boarding' },
    ],
  },
  {
    label: 'Camping',
    options: [
      { value: 'Camping, Any', label: 'Camping, Any' },
      { value: 'Bonfire', label: 'Bonfire' },
      { value: 'Camping, RV', label: 'Camping, RV' },
      { value: 'Camping, local', label: 'Camping, local' },
    ],
  },
  {
    label: 'Climbing',
    options: [
      { value: 'Climbing, Any', label: 'Climbing, Any' },
      { value: 'Climbing, Boulder/Sport', label: 'Climbing, Boulder/Sport' },
      { value: 'Climbing, Indoor', label: 'Climbing, Indoor' },
      { value: 'Climbing, Mountaineering/Ice', label: 'Climbing, Mountaineering/Ice' },
      { value: 'Climbing, Tree', label: 'Climbing, Tree' },
      { value: 'Rappelling', label: 'Rappelling' },
    ],
  },
  {
    label: 'Fishing',
    options: [
      { value: 'Fishing, Any', label: 'Fishing, Any' },
      { value: 'Fishing, Deep Water', label: 'Fishing, Deep Water' },
      { value: 'Fishing, Freshwater', label: 'Fishing, Freshwater' },
      { value: 'Fishing, Saltwater', label: 'Fishing, Saltwater' },
      { value: 'Fishing, Ice', label: 'Fishing, Ice' },
    ],
  },
  {
    label: 'Flying',
    options: [
      { value: 'Flying, Drones/RC', label: 'Flying, Drones/RC' },
      { value: 'Flying, Airplane', label: 'Flying, Airplane' },
      { value: 'Flying, Unpowered/Gliding', label: 'Flying, Unpowered/Gliding' },
      { value: 'Kiting', label: 'Kiting' },
    ],
  },
  {
    label: 'Hunting',
    options: [
      { value: 'Hunting, Any', label: 'Hunting, Any' },
      { value: 'Hunting, Bow', label: 'Hunting, Bow' },
      { value: 'Hunting, Handgun', label: 'Hunting, Handgun' },
      { value: 'Hunting, Rifle', label: 'Hunting, Rifle' },
      { value: 'Hunting, Shotgun', label: 'Hunting, Shotgun' },
      { value: 'Trapping', label: 'Trapping' },
    ],
  },
  {
    label: 'Motor Sports',
    options: [
      { value: 'Motor Sports, Any', label: 'Motor Sports, Any' },
      { value: 'ATV / 4-wheeling', label: 'ATV / 4-wheeling' },
      { value: 'Dirt-biking', label: 'Dirt-biking' },
      { value: 'Jet-skiing', label: 'Jet-skiing' },
      { value: 'Off-road Trucking', label: 'Off-road Trucking' },
      { value: 'Snowmobiling', label: 'Snowmobiling' },
    ],
  },
  {
    label: 'Nature',
    options: [
      { value: 'Conservation, Any', label: 'Conservation, Any' },
      { value: 'Restoration, Any', label: 'Restoration, Any' },
      { value: 'Birdwatching', label: 'Birdwatching' },
      { value: 'Picking/Foraging', label: 'Picking/Foraging' },
      { value: 'Gardening', label: 'Gardening' },
      { value: 'Restoration, Historical', label: 'Restoration, Historical' },
      { value: 'Volunteer', label: 'Volunteer' },
      { value: 'Wildlife Viewing', label: 'Wildlife Viewing' },
    ],
  },
  {
    label: 'Shooting',
    options: [
      { value: 'Shooting, Any', label: 'Shooting, Any' },
      { value: 'Archery', label: 'Archery' },
      { value: 'Shooting, Plinking/Target/Range', label: 'Shooting, Plinking/Target/Range' },
      { value: 'Shooting, Trap', label: 'Shooting, Trap' },
      { value: 'Paintball', label: 'Paintball' },
    ],
  },
  {
    label: 'Swimming',
    options: [
      { value: 'Diving', label: 'Diving' },
      { value: 'Scuba', label: 'Scuba' },
      { value: 'Snorkeling', label: 'Snorkeling' },
      { value: 'Sunbathing', label: 'Sunbathing' },
      { value: 'Swimming, Any', label: 'Swimming, Any' },
      { value: 'Swimming, Wild', label: 'Swimming, Wild' },
      { value: 'Swimming, Pool', label: 'Swimming, Pool' },
    ],
  },
  {
    label: 'Team Sports',
    options: [
      { value: 'Team, Any', label: 'Team, Any' },
      { value: 'Field Sports', label: 'Field Sports' },
      { value: 'Frisbee', label: 'Frisbee' },
      { value: 'Sport, Playing', label: 'Sport, Playing' },
      { value: 'Sport, Spectator', label: 'Sport, Spectator' },
      { value: 'Team Building', label: 'Team Building' },
      { value: 'Ultimate', label: 'Ultimate' },
      { value: 'Volleyball', label: 'Volleyball' },
    ],
  },
  {
    label: 'Walking/Running',
    options: [
      { value: 'Walk / Run, Any', label: 'Walk / Run, Any' },
      { value: 'Run, Jog', label: 'Run, Jog' },
      { value: 'Run, Trail', label: 'Run, Trail' },
      { value: 'Hiking, Day', label: 'Hiking, Day' },
      { value: 'Beach Combing', label: 'Beach Combing' },
      { value: 'Triathlon', label: 'Triathlon' },
      { value: 'Adventure Racing', label: 'Adventure Racing' },
    ],
  },
  {
    label: 'Leisure',
    options: [
      { value: 'Astronomy', label: 'Astronomy' },
      { value: 'Golf', label: 'Golf' },
      { value: 'Photography/Painting', label: 'Photography / Painting' },
      { value: 'Travel', label: 'Travel' },
    ],
  },
];

export const optionAllCombinedCat = [
  { value: 'Animal Lover. Any', label: 'Animal Lover. Any', category: 'Animals' },
  { value: 'Dogs', label: 'Dogs', category: 'Animals' },
  { value: 'Dog, Hunting', label: 'Dog, Hunting', category: 'Animals' },
  { value: 'Dog Sledding', label: 'Dog Sledding', category: 'Animals' },
  { value: 'Farm Animals', label: 'Farm Animals', category: 'Animals' },
  { value: 'Herding', label: 'Herding', category: 'Animals' },
  { value: 'Horse', label: 'Horse', category: 'Animals' },
  { value: 'Biking, Any', label: 'Biking, Any', category: 'Bicycling' },
  { value: 'Biking, BMX', label: 'Biking, BMX', category: 'Bicycling' },
  { value: 'Biking, Mountain', label: 'Biking, Mountain', category: 'Bicycling' },
  { value: 'Cycling, Road', label: 'Cycling, Road', category: 'Bicycling' },
  { value: 'Cycling, Winter', label: 'Cycling, Winter', category: 'Bicycling' },
  { value: 'Boarding, Any', label: 'Boarding, Any', category: 'Boarding/Skiing' },
  { value: 'Board-sailing/Windsurfing', label: 'Board-sailing/Windsurfing', category: 'Boarding/Skiing' },
  { value: 'Skiing, Alpine', label: 'Skiing, Alpine', category: 'Boarding/Skiing' },
  { value: 'Skiing, Cross Country', label: 'Skiing, Cross Country', category: 'Boarding/Skiing' },
  { value: 'Skateboarding', label: 'Skateboarding', category: 'Boarding/Skiing' },
  { value: 'Sledding', label: 'Sledding', category: 'Boarding/Skiing' },
  { value: 'Snowboarding', label: 'Snowboarding', category: 'Boarding/Skiing' },
  { value: 'Snowshoeing', label: 'Snowshoeing', category: 'Boarding/Skiing' },
  { value: 'Large Boat, Any', label: 'Large Boat, Any', category: 'Boating, Large' },
  { value: 'Sailing', label: 'Sailing', category: 'Boating, Large' },
  { value: 'Motor-boating', label: 'Motor-boating', category: 'Boating, Large' },
  { value: 'Yachting', label: 'Yachting', category: 'Boating, Large' },
  { value: 'Small Boat, Any', label: 'Small Boat, Any', category: 'Boating, Small' },
  { value: 'Canoeing', label: 'Canoeing', category: 'Boating, Small' },
  { value: 'Kayaking, Recreational', label: 'Kayaking, Recreational', category: 'Boating, Small' },
  { value: 'Kayaking, Sea/Tour', label: 'Kayaking, Sea/Tour', category: 'Boating, Small' },
  { value: 'Kayaking, White Water', label: 'Kayaking, White Water', category: 'Boating, Small' },
  { value: 'Kayaking, Fishing', label: 'Kayaking, Fishing', category: 'Boating, Small' },
  { value: 'Rafting', label: 'Rafting', category: 'Boating, Small' },
  { value: 'Camping, Any', label: 'Camping, Any', category: 'Camping' },
  { value: 'Bonfire', label: 'Bonfire', category: 'Camping' },
  { value: 'Camping, RV', label: 'Camping, RV', category: 'Camping' },
  { value: 'Camping, local', label: 'Camping, local', category: 'Camping' },
  { value: 'Climbing, Any', label: 'Climbing, Any', category: 'Climbing' },
  { value: 'Climbing, Boulder/Sport', label: 'Climbing, Boulder/Sport', category: 'Climbing' },
  { value: 'Climbing, Indoor', label: 'Climbing, Indoor', category: 'Climbing' },
  { value: 'Climbing, Mountaineering/Ice', label: 'Climbing, Mountaineering/Ice', category: 'Climbing' },
  { value: 'Climbing, Tree', label: 'Climbing, Tree', category: 'Climbing' },
  { value: 'Rappelling', label: 'Rappelling', category: 'Climbing' },
  { value: 'Fishing, Any', label: 'Fishing, Any', category: 'Fishing' },
  { value: 'Fishing, Deep Water', label: 'Fishing, Deep Water', category: 'Fishing' },
  { value: 'Fishing, Freshwater', label: 'Fishing, Freshwater', category: 'Fishing' },
  { value: 'Fishing, Saltwater', label: 'Fishing, Saltwater', category: 'Fishing' },
  { value: 'Fishing, Ice', label: 'Fishing, Ice', category: 'Fishing' },
  { value: 'Flying, Drones/RC', label: 'Flying, Drones/RC', category: 'Flying' },
  { value: 'Flying, Airplane', label: 'Flying, Airplane', category: 'Flying' },
  { value: 'Flying, Unpowered/Gliding', label: 'Flying, Unpowered/Gliding', category: 'Flying' },
  { value: 'Kiting', label: 'Kiting', category: 'Flying' },
  { value: 'Hunting, Any', label: 'Hunting, Any', category: 'Hunting' },
  { value: 'Hunting, Bow', label: 'Hunting, Bow', category: 'Hunting' },
  { value: 'Hunting, Handgun', label: 'Hunting, Handgun', category: 'Hunting' },
  { value: 'Hunting, Rifle', label: 'Hunting, Rifle', category: 'Hunting' },
  { value: 'Hunting, Shotgun', label: 'Hunting, Shotgun', category: 'Hunting' },
  { value: 'Trapping', label: 'Trapping', category: 'Hunting' },
  { value: 'Motor Sports, Any', label: 'Motor Sports, Any', category: 'Motor Sports' },
  { value: 'ATV / 4-wheeling', label: 'ATV / 4-wheeling', category: 'Motor Sports' },
  { value: 'Dirt-biking', label: 'Dirt-biking', category: 'Motor Sports' },
  { value: 'Jet-skiing', label: 'Jet-skiing', category: 'Motor Sports' },
  { value: 'Off-road Trucking', label: 'Off-road Trucking', category: 'Motor Sports' },
  { value: 'Snowmobiling', label: 'Snowmobiling', category: 'Motor Sports' },
  { value: 'Conservation, Any', label: 'Conservation, Any', category: 'Restoration/Conservation' },
  { value: 'Restoration, Any', label: 'Restoration, Any', category: 'Restoration/Conservation' },
  { value: 'Birdwatching', label: 'Birdwatching', category: 'Restoration/Conservation' },
  { value: 'Picking/Foraging', label: 'Picking/Foraging', category: 'Restoration/Conservation' },
  { value: 'Gardening', label: 'Gardening', category: 'Restoration/Conservation' },
  { value: 'Restoration, Historical', label: 'Restoration, Historical', category: 'Restoration/Conservation' },
  { value: 'Volunteer', label: 'Volunteer', category: 'Restoration/Conservation' },
  { value: 'Wildlife Viewing', label: 'Wildlife Viewing', category: 'Restoration/Conservation' },
  { value: 'Shooting, Any', label: 'Shooting, Any', category: 'Shooting' },
  { value: 'Archery', label: 'Archery', category: 'Shooting' },
  { value: 'Shooting, Plinking/Target/Range', label: 'Shooting, Plinking/Target/Range', category: 'Shooting' },
  { value: 'Shooting, Trap', label: 'Shooting, Trap', category: 'Shooting' },
  { value: 'Paintball', label: 'Paintball', category: 'Shooting' },
  { value: 'Diving', label: 'Diving', category: 'Swimming' },
  { value: 'Scuba', label: 'Scuba', category: 'Swimming' },
  { value: 'Snorkeling', label: 'Snorkeling', category: 'Swimming' },
  { value: 'Sunbathing', label: 'Sunbathing', category: 'Swimming' },
  { value: 'Swimming, Any', label: 'Swimming, Any', category: 'Swimming' },
  { value: 'Swimming, Wild', label: 'Swimming, Wild', category: 'Swimming' },
  { value: 'Swimming, Pool', label: 'Swimming, Pool', category: 'Swimming' },
  { value: 'Team, Any', label: 'Team, Any', category: 'Team Sports' },
  { value: 'Field Sports', label: 'Field Sports', category: 'Team Sports' },
  { value: 'Frisbee', label: 'Frisbee', category: 'Team Sports' },
  { value: 'Sport, Playing', label: 'Sport, Playing', category: 'Team Sports' },
  { value: 'Sport, Spectator', label: 'Sport, Spectator', category: 'Team Sports' },
  { value: 'Team Building', label: 'Team Building', category: 'Team Sports' },
  { value: 'Ultimate', label: 'Ultimate', category: 'Team Sports' },
  { value: 'Volleyball', label: 'Volleyball', category: 'Team Sports' },
  { value: 'Walk / Run, Any', label: 'Walk / Run, Any', category: 'Walking/Running' },
  { value: 'Run, Jog', label: 'Run, Jog', category: 'Walking/Running' },
  { value: 'Run, Trail', label: 'Run, Trail', category: 'Walking/Running' },
  { value: 'Hiking, Day', label: 'Hiking, Day', category: 'Walking/Running' },
  { value: 'Beach Combing', label: 'Beach Combing', category: 'Walking/Running' },
  { value: 'Triathlon', label: 'Triathlon', category: 'Combined Sports' },
  { value: 'Adventure Racing', label: 'Adventure Racing', category: 'Combined Sports' },
  { value: 'Astronomy', label: 'Astronomy', category: 'Leisure/Other' },
  { value: 'Golf', label: 'Golf', category: 'Leisure/Other' },
  { value: 'Photography/Painting', label: 'Photography / Painting', category: 'Leisure/Other' },
  { value: 'Travel', label: 'Travel', category: 'Leisure/Other' },
];
