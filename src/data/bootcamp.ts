import type {Bootcamp} from "@/types";
import { digitalMarketing } from "./bootcamps/digital-marketing";
import { hrga } from "./bootcamps/hrga";
import { socialMediaSpecialist } from "./bootcamps/social-media-specialist";
import { marketplaceOptimization } from "./bootcamps/marketplace-optimization";
import { publicSpeaking } from "./bootcamps/public-speaking";
import { smartCreator } from "./bootcamps/smart-creator";
import { retailFranchise } from "./bootcamps/retail-franchise";

export const bootcamps: Bootcamp[] = [
  hrga,
  socialMediaSpecialist,
  digitalMarketing,
  marketplaceOptimization,
  publicSpeaking,
  smartCreator,
  retailFranchise,
];
