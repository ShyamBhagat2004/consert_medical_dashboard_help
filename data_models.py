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
    datetime: str
    hospitalisation_day: int
    post_surgery_day: int

class end_of_cycle_info(BaseModel):
    id: int
    datetime: str
    fluid_loss: int
    fluid_gain: int
    fluid_diff: int

class lines(BaseModel):
    id: int
    datetime: str
    line: str
    No: str
    placement_date: str
    change_date: str

class graph_data(BaseModel):
    id: int
    datetime: str
    temperature: float
    bloodPressure: float
    bloodOxygen: int
    # systolic_pressure: int
    # diastolic_pressure: int

class heart_data(BaseModel):
    id: int
    datetime: str
    CVP: int | None = None
    PAP: int | None = None
    PWP: int | None = None
    CO: int | None = None
    ICP: int | None = None

class respiratory_data(BaseModel):
    id: int
    datetime: str
    respiration_type: str | None = None
    VT: int | None = None
    RR: int | None = None
    PEEP: int | None = None
    FiO2: int | None = None
    maskO2: str | None = None

class blood_gasses(BaseModel):
    id: int
    datetime: str
    pH: float | None = None
    PaO2: float | None = None
    PaCO2: float | None = None
    HCO3: float | None = None
    SatO2: float | str | None = None
    BE: float | None = None

class expelled_fluids(BaseModel):
    id: int
    datetime: str
    urine: int | float | None = None
    levin: int | float | None = None
    paroxeteushA: int | float | None = None
    paroxeteushB: int | float | None = None
    lost_fluid_sum: int | float | None = None

class need_only_data(BaseModel):
    id: int
    datetime: str
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

