from pydantic import BaseModel

class Patient_data(BaseModel):
    id: int
    first_name: str
    last_name: str
    age: int
    height: str
    weight: str
    diagnosis: str
    do_not_administer: str
    blood_type: str
    date_of_entry: str
    apacheii: int
    iss: int
    ts: int
    gcs: int

class start_of_cycle_info(BaseModel):
    id: int
    date: str
    hospitalisation_day: int
    post_surgery_day: int

class end_of_cycle_info(BaseModel):
    id: int
    date: str
    fluid_loss: int
    fluid_gain: int
    fluid_diff: int

class lines(BaseModel):
    id: int
    date: str
    line: str
    No: str
    placement_date: str
    change_date: str

class graph_data(BaseModel):
    id: int
    timestamp: str
    AN: int
    Θ: float
    ΑΠΣΦ: int
    mlow: int
    mhigh: int

class heart_data(BaseModel):
    id: int
    date: str
    time: str
    CVP: int
    PAP: int
    PWP: int
    CO: int
    ICP: int

class respiratory_data(BaseModel):
    id: int
    date: str
    time: str
    respiration_type: str
    VT: int
    RR: int
    PEEP: int
    FiO2: int
    maskO2: str

class blood_gasses(BaseModel):
    id: int
    date: str
    time: str
    pH: float
    PaO2: float
    PaCO2: float
    HCO3: float
    SatO2: float | str
    BE: float

class expelled_fluids(BaseModel):
    id: int
    date: str
    time: str
    urine: int | float
    levin: int | float
    paroxeteushA: int | float
    paroxeteushB: int | float
    lost_fluid_sum: int | float

class need_only_data(BaseModel):
    id: int
    date: str
    time: str
    aimatokritis: str | None = None
    aimosfairinh: float | None = None
    lefka: float | None = None
    aimopetalia: float | None = None
    sakxaro: float | None = None
    ouria: float | None = None
    kreatinh: float | None = None
    K: float | None = None
    Na: float | None = None
    Ca: float | None = None
    xolerithrinh_olikh: float | None = None
    xolerithrinh_amesh: float | None = None
    SGOTAST: float | None = None
    SGPTALT: float | None = None
    gammaGT: float | None = None
    alkalfosfatash: float | None = None
    LDH: float | None = None
    amylash_aimatos: float | None = None
    amylash_ouron: float | None = None
    CPK: float | None = None
    CPK_MB: float | None = None
    troponini: float | None = None
    myosfairinh: float | None = None
    PT: float | None = None
    INR: float | None = None
    aPTT: float | None = None
    sakxaro_ouron: float | None = None
    ouria_ouron: float | None = None
    kreatinh_ouron: float | None = None

