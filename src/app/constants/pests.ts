import { IMAGES } from "./images";

// Type definition for pest pages keys
export type PestPages =
	| "ant-pest-control-sydney"
	| "bed-bug-pest-control"
	| "bee-pest-control"
	| "bird-pest-control"
	| "carpet-beetle-pest-control"
	| "cockroach-pest-control"
	| "fly-pest-control"
	| "mosquito-pest-control"
	| "possum-pest-control"
	| "rats-mice-pest-control"
	| "spider-pest-control-study"
	| "stored-product-pests-control"
	| "wasp-pest-control";

// Lazy loading map for pest study data - only loads when accessed
const pestStudyLoaders: Record<PestPages, () => Promise<any>> = {
	"ant-pest-control-sydney": () => import("./pests/ant-pest-study").then((m) => m.default),
	"bed-bug-pest-control": () => import("./pests/bed-bugs-pest-study").then((m) => m.default),
	"bee-pest-control": () => import("./pests/bee-pest-study").then((m) => m.default),
	"bird-pest-control": () => import("./pests/bird-pest-study").then((m) => m.default),
	"carpet-beetle-pest-control": () => import("./pests/carpet-beetle-pest-study").then((m) => m.default),
	"cockroach-pest-control": () => import("./pests/cockroach-pest-study").then((m) => m.default),
	"fly-pest-control": () => import("./pests/fly-pest-study").then((m) => m.default),
	"mosquito-pest-control": () => import("./pests/mosquito-pest-study").then((m) => m.default),
	"possum-pest-control": () => import("./pests/possum-pest-study").then((m) => m.default),
	"rats-mice-pest-control": () => import("./pests/rats-mice-pest-study").then((m) => m.default),
	"spider-pest-control-study": () => import("./pests/spider-pest-study").then((m) => m.default),
	"stored-product-pests-control": () => import("./pests/stored-product-pest-study").then((m) => m.default),
	"wasp-pest-control": () => import("./pests/wasps-pest-study").then((m) => m.default),
};

// Cache for loaded pest study data to avoid re-importing
const pestStudyCache: Record<PestPages, any> = {} as Record<PestPages, any>;

/**
 * Lazy loads pest study data for a given pest page key.
 * Data is cached after first load to avoid re-importing.
 */
export async function getPestStudyData(key: PestPages): Promise<any> {
	if (pestStudyCache[key]) {
		return pestStudyCache[key];
	}

	const loader = pestStudyLoaders[key];
	if (!loader) {
		throw new Error(`No pest study data found for key: ${key}`);
	}

	const data = await loader();
	pestStudyCache[key] = data;
	return data;
}

/**
 * Synchronous accessor for pest study data (for backwards compatibility).
 * Note: This will throw if data hasn't been loaded yet. Use getPestStudyData() to load it asynchronously first.
 */
export function getPestStudyDataSync(key: PestPages): any {
	if (!pestStudyCache[key]) {
		throw new Error(
			`Pest study data for "${key}" has not been loaded yet. Use getPestStudyData() to load it asynchronously first.`
		);
	}
	return pestStudyCache[key];
}

// Legacy export for backwards compatibility - returns empty object to avoid eager loading
// Components should use getPestStudyData() instead
export const pestPages: Record<PestPages, any> = {} as any;

export const pestData = [
	{
		imageSrc: IMAGES.PEST_COCKROACHES,
		imageAlt: "Cockroaches",
		pestName: "Cockroaches",
		commonSigns: "Droppings, greasy marks behind appliances, live sightings",
		treatment:
			"Use gel baits, residual sprays, and deep cleaning of hiding places. We'll also advise on restricting food and moisture sources",
		path: "cockroach-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.PEST_ANTS,
		imageAlt: "Ants",
		pestName: "Ants (especially sugar / coastal / carpenter ants)",
		commonSigns: "Trails in kitchens, food cupboards, small mounds near foundations",
		treatment:
			"We locate nests, apply targeted baiting (low-toxicity), spray entry points, and seal cracks. Regular follow-ups help stop recurrence",
		path: "ant-pest-control-sydney" as PestPages,
	},
	{
		imageSrc: IMAGES.PEST_RODENTS,
		imageAlt: "Rodents",
		pestName: "Rodents (rats & mice)",
		commonSigns: "Gnawed wires / wood, droppings, scrambling in roof spaces",
		treatment: "Use enclosed baits, traps, exclusion work (sealing entry points). Inspect attics, walls, subfloors for nests",
		path: "rats-mice-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.PEST_SPIDER,
		imageAlt: "Spiders",
		pestName: "Spiders (including dangerous species)",
		commonSigns: "Webs in corners, sightings in dark areas",
		treatment: "We use safe sprays and residual barrier treatments. We also reduce harbourage in storage and garden areas",
		path: "spider-pest-control-study" as PestPages,
	},
	{
		imageSrc: IMAGES.PEST_BED_BUGS,
		imageAlt: "Bed Bugs",
		pestName: "Bed bugs, fleas, wasps, silverfish, ants in lawns",
		commonSigns: "Bites, nest in walls or under eaves, holes in fabrics",
		treatment:
			"Treatments adapted per pest type — e.g. mattress treatments, insecticide dust in wall voids, spray for wasp nests",
		path: "bed-bug-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.BEES_PEST_STUDY_BG,
		imageAlt: "Bees",
		pestName: "Bees (including honey bees and carpenter bees)",
		commonSigns: "Buzzing in walls, visible hives, increased activity around eaves",
		treatment:
			"We use humane relocation where possible, hive removal, and cavity sealing. Professional handling ensures safe removal and prevents recurrence",
		path: "bee-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.BIRD_PEST_STUDY_BG,
		imageAlt: "Birds",
		pestName: "Birds (pigeons, ibis, mynas, starlings)",
		commonSigns: "Droppings accumulation, nesting materials in gutters, noise at dawn",
		treatment:
			"We install proofing systems (netting, spikes, mesh), remove nests safely, and clean affected areas. Regular monitoring prevents return",
		path: "bird-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.CARPET_BEETLE_PEST_STUDY_BG,
		imageAlt: "Carpet Beetle",
		pestName: "Carpet beetles (and fabric pests)",
		commonSigns: "Holes in fabrics, shed larvae skins, damage to wool and silk items",
		treatment:
			"We apply targeted treatments to affected areas, treat larvae hiding spots, and provide advice on protecting fabrics. Follow-ups ensure complete removal",
		path: "carpet-beetle-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.FLIES_PEST_STUDY_BG,
		imageAlt: "Flies",
		pestName: "Flies (house flies, fruit flies, blowflies)",
		commonSigns: "Frequent sightings, buzzing sounds, presence near food sources",
		treatment:
			"We identify breeding sites, apply residual treatments, and install fly control systems. We'll advise on sanitation to eliminate attractants",
		path: "fly-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.MOSQUITOES_PEST_STUDY_BG,
		imageAlt: "Mosquitoes",
		pestName: "Mosquitoes (disease vectors and nuisance species)",
		commonSigns: "Biting at dawn/dusk, standing water nearby, buzzing in outdoor areas",
		treatment:
			"We treat breeding sites, apply barrier sprays, and remove water sources. Our methods reduce mosquito populations while being safe for families",
		path: "mosquito-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.POSSUM_PEST_STUDY_BG,
		imageAlt: "Possum",
		pestName: "Possums (brushtail and ringtail possums)",
		commonSigns: "Noise in roof at night, droppings, entry points visible on roof",
		treatment:
			"We use humane exclusion methods, install one-way doors, and seal entry points. We follow regulations for protected wildlife handling",
		path: "possum-pest-control" as PestPages,
	},
	{
		imageSrc: IMAGES.STORED_PRODUCT_PESTS_PEST_STUDY_BG,
		imageAlt: "Stored Product Pests",
		pestName: "Stored product pests (pantry moths, grain beetles)",
		commonSigns: "Larvae in food packages, webbing in cupboards, small beetles in grains",
		treatment:
			"We inspect and treat pantry areas, dispose of infested food, and apply targeted treatments. We'll guide on proper food storage practices",
		path: "stored-product-pests-control" as PestPages,
	},
	{
		imageSrc: IMAGES.WASPS_PEST_STUDY_BG,
		imageAlt: "Wasps",
		pestName: "Wasps (European wasps and paper wasps)",
		commonSigns: "Nests under eaves, aggressive behaviour, visible wasp activity",
		treatment:
			"We locate and remove nests safely, apply residual treatments to prevent return, and provide advice on preventing future nesting. Safety is our priority",
		path: "wasp-pest-control" as PestPages,
	},
];
