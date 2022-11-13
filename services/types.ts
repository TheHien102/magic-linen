export type LoginAdminPrams = {
  username: string;
  password: string;
};

export type AddProductPrams = {
  name: string;
  discount: string;
  description: string;
  price: string;
  productCategoryID: number;
  variants: { name: string; property: string; addPrice: number }[];
  assets: { type: string; data: string; isMain: number }[];
};

export type AboutPageResponse = {
  about_us: string;
  background_img: string;
  spec_introduction: string;
  team_members: {
    title: string;
    first_name: string;
    last_name: string;
    photo: string;
    position: string;
    organisation: string;
    introduction: string;
  }[];
  collaborators: {
    title: string;
    first_name: string;
    last_name: string;
    photo: string;
    position: string;
    organisation: string;
    introduction: string;
  }[];
  quote: {
    text: string;
    image: string;
  };
};

export type ContactParams = {
  name: string;
  email: string;
  query: string;
};

export type ContactUsResponse = {
  message: string;
};

export type LoginPrams = {
  email: string;
  password: string;
};

export type AccountParams = {
  email: string;
  password: string;
  re_password: string;
  first_name: string;
  last_name: string;
  admindiv_l1: string;
  admindiv_l2: string;
  admindiv_l3: string;
  organisation: string;
  field_of_interest: string;
  type_of_role: string;
};

export type ResetPasswordParams = {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
};

export type TokenResponse = {
  access: string;
  refresh: string;
};

export type User = {
  token: string;
  refreshToken: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type ProjectListSort = 'ascend' | 'descend';
export type ProjectListParams = {
  page: number;
  search?: string;
  per_page?: number;
  sort?: ProjectListSort;
};

export type Project = {
  pk: number;
  title: string;
  description?: string;
  fitfile?: File;
  predfile?: File;
  type: string;
  status: string;
  date_created: string;
};

export type Locations = {
  long: number[];
  lat: number[];
};

export type CVStats = [string | number][];
export type TOCBootpredSumm = [string | number][];

export type ProjectCalibrate = {
  project_pk: number;
  project_status: string;
  project_type: string;
  message: string;
  cvstats: CVStats;
  locations: {
    augdfit_locs: Locations | null;
    fit_locs: Locations | null;
    pred_locs: Locations | null;
  };
  pcs: PCS;
  toc: TOC;
  spectra: Spectra;
  toc_bootpred: {
    x: number[];
    y: number;
    error_y: number[];
    id: string[];
  };
  toc_bootpred_summ: TOCBootpredSumm;
  toc_cvpred: {
    x: number[];
    y: number[];
    id: string[];
  };
};

export type CreateProjectParams = {
  title: string;
  description: string;
  fitfile?: File | null;
  predfile?: File | null;
};

export type ProjectsResponse = {
  results: Project[];
  count: number;
};

export type TOC = number[];

export type Spectra = {
  x: number[];
  y: number[];
  id: string[];
}[];

export type PCS = {
  lib_pcs: {
    x: number[];
    y: number[];
    z: number[];
  };
  fit_pcs: {
    x: number[];
    y: number[];
    z: number[];
  };
  pred_pcs: {
    x: number[];
    y: number[];
    z: number[];
  };
  augdfit_pcs: {
    x: number[];
    y: number[];
    z: number[];
  };
};

export type ProjectDetails = {
  project_pk: number;
  project_title: string;
  project_type: string;
  project_status: string;
  fitdf: Array<string | number>[];
  fitdf_col1: string;
  fitdf_col2: string;
  fitdf_col3: string;
  fitdf_col4: string;
  predf: Array<string | number>[];
  predf_col1: string;
  predf_col2: string;
  predf_col3: string;
  spectra_type: string;
  spectra_unit: string;
  carbon_unit: string;
  toc: TOC;
  spectra: Spectra;
  pcs: PCS;
};

export type ProjectCheckParams = {
  fitdf_col1?: string;
  fitdf_col2?: string;
  fitdf_col3?: string;
  fitdf_col4?: string;
  predf_col1?: string;
  predf_col2?: string;
  predf_col3?: string;
  spectra_type: string;
  spectra_unit: string;
  carbon_unit: string;
};

export type UserTableData = {
  heading: (string | number)[];
  data: object[];
};

export type UserCount = {
  Africa: 0;
  Antarctica: 0;
  Asia: 1;
  Europe: 0;
  'North America': 0;
  Oceania: 4;
  'South America': 0;
  [key: string]: number;
};

export type AdminProductParams = {};

export type HomePageResponse = {
  logos: {
    globespex_white: string;
    globespex_black: string;
    fao: string;
    soil_partner: string;
    curtin: string;
  };
  background_img: string;
  short_description: {
    title: string;
    text: string;
  };
  long_description: {
    title: string;
    text: string;
  };
  process: {
    description: string;
    steps: {
      label: string;
      icon: string;
    }[];
  };
  methodology: string[];
  video: {
    thumbnail: string;
    url: string;
  };
  reviews: {
    first_name: string;
    last_name: string;
    photo: string;
    comment: string;
  }[];
};

export type PolicyPageResponse = {
  __html: string;
};

export type TermOfUsePageResponse = {
  __html: string;
};
