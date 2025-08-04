'use client';
import { useState, useEffect } from 'react';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import {
  IBranches,
  IDepartments,
  ICurrency,
  IStatus,
  IRoles,
  IBranchTypes,
  ICity,
  IProductType,
  IIAReportType
} from '@/api/ResponseTypes/general';
import {
  IAccountOfficers,
  IGLAccount,
  IGlClass,
  IGLClassType,
  IGlDetails,
  IGlNode,
  IGLType,
  INodeType,
  IUsers
} from '@/api/ResponseTypes/admin';
import {
  IBankProducts,
  ICheckBooks,
  ICountries,
  IGroup,
  IIDTypes,
  ILienReason,
  IRelationship,
  IStates,
  ITitle,
  ITown
} from '@/api/ResponseTypes/customer-service';
import {
  ICreditInterests,
  IEducation,
  IException,
  IFrequency,
  IGetCommercialBank,
  IGetNibbsCommercialBank,
  IGLNode,
  IGLTypeClass,
  IGLWithBranchCode,
  IInterests,
  ILoanClass,
  IOccupation,
  IProdCodeType,
  IProdType,
  IProductClass,
  IProducts,
  IRegionByCode,
  ISector,
  ITransactionType
} from '@/api/ResponseTypes/setup';
import {
  IChargeConcessionType,
  IGetClearingBank,
  IGetZone
} from '@/api/ResponseTypes/operation';

import {
  ILoans,
  IProductLoanPurpose,
  IProductLoanRepayment,
  ILoansource,
  ILoanCollateral
} from '@/api/ResponseTypes/loans';

interface IGlDetailsOptions extends OptionsI {
  bkBalance: number;
}

interface ISelect {
  branches?: IBranches[] | Array<any>;
  iAReportType?: IIAReportType[] | Array<any>;
  departments?: IDepartments[] | Array<any>;
  currencies?: ICurrency[] | Array<any>;
  glType?: IGLType[] | Array<any>;
  roles?: IRoles[] | Array<any>;
  status?: IStatus[] | Array<any>;
  node?: INodeType[] | IGLNode[] | Array<any>;
  glClasses?: IGLClassType[] | Array<any>;
  bankgl?: IGLAccount[] | Array<any>;
  bankproducts?: IBankProducts[] | Array<any>;
  states?: IStates[] | Array<any>;
  branchTypes?: IBranchTypes[] | Array<any>;
  towns?: ICity[] | ITown[] | Array<any>;
  titles?: ITitle[] | Array<any>;
  countries?: ICountries[] | Array<any>;
  relationships?: IRelationship[] | Array<any>;
  idCards?: IIDTypes[] | Array<any>;
  officers?: IAccountOfficers[] | Array<any>;
  groups?: IGroup[] | Array<any>;
  sectors?: ISector[] | Array<any>;
  education?: IEducation[] | Array<any>;
  professions?: IOccupation[] | Array<any>;
  productTypes?: IProductType[] | Array<any>;
  lienReason?: ILienReason[] | Array<any>;
  checkbooks?: ICheckBooks[] | Array<any>;
  commBanks?: IGetCommercialBank[] | Array<any>;
  allNibbsBank?: IGetNibbsCommercialBank[] | Array<any>;
  details?: ITransactionType[] | Array<any>;
  charges?: IChargeConcessionType[] | Array<any>;
  zones?: IGetZone[] | Array<any>;
  clearBanks?: IGetClearingBank[] | Array<any>;
  glDetails?: IGlDetails[] | Array<any>;
  gLnode?: IGlNode[] | Array<any>;
  gLclass?: IGlClass[] | IGLTypeClass[] | Array<any>;
  loans?: ILoans[] | Array<any>;
  loansPurpose?: IProductLoanPurpose[] | Array<any>;
  repaymentTypes?: IProductLoanRepayment[] | Array<any>;
  loansources?: ILoansource[] | Array<any>;
  collaterals?: ILoanCollateral[] | Array<any>;
  region?: IRegionByCode[];
  allNationStates?: IStates[];
  allStateTowns?: ITown[];
  creditInterests?: ICreditInterests[];
  loanClass?: ILoanClass[];
  interests?: IInterests[];
  products?: IProducts[] | IProductClass[] | Array<any>;
  exception?: IException[];
  frequency?: IFrequency[];
  users?: IUsers[];
  data?: IProdType[] | IProdCodeType[] | IGLWithBranchCode[] | Array<any>;
  dataType?: IProdCodeType[] | IProdType[] | Array<any>;
  dataWithCode?:
    | IProdType[]
    | IProdCodeType[]
    | IGLWithBranchCode[]
    | Array<any>;
}

export const useMapSelectOptions = ({
  currencies,
  branches,
  iAReportType,
  departments,
  glType,
  status,
  node,
  glClasses,
  roles,
  bankgl,
  bankproducts,
  states,
  branchTypes,
  towns,
  titles,
  countries,
  relationships,
  idCards,
  officers,
  users,
  groups,
  sectors,
  education,
  professions,
  productTypes,
  lienReason,
  checkbooks,
  commBanks,
  allNibbsBank,
  details,
  charges,
  zones,
  clearBanks,
  glDetails,
  gLnode,
  gLclass,
  region,
  allNationStates,
  allStateTowns,
  loans,
  loansPurpose,
  repaymentTypes,
  loansources,
  collaterals,
  creditInterests,
  loanClass,
  interests,
  products,
  exception,
  frequency,
  data,
  dataType,
  dataWithCode
}: ISelect) => {
  const [mappedNationStates, setMappedNationStates] = useState<OptionsI[]>([]);
  const [mappedStateTowns, setMappedStateTowns] = useState<OptionsI[]>([]);
  const [mappedGlClasses, setMappedGlClass] = useState<OptionsI[]>([]);
  const [mappedGlNodes, setMappedGlNode] = useState<OptionsI[]>([]);
  const [mappedGlDetails, setMappedGlDetails] = useState<IGlDetailsOptions[]>(
    []
  );
  const [mappedCheckBooks, setMappedCheckBooks] = useState<OptionsI[]>([]);
  const [mappedLienReason, setLienReason] = useState<OptionsI[]>([]);
  const [mappedProfessions, setProfession] = useState<OptionsI[]>([]);
  const [mappedSectors, setSector] = useState<OptionsI[]>([]);
  const [mappedEducation, setEducation] = useState<OptionsI[]>([]);
  const [mappedGroups, setGroups] = useState<OptionsI[]>([]);
  const [mappedAccountOfficers, setAccountOfficers] = useState<OptionsI[]>([]);
  const [mappedUsers, setMappedUsers] = useState<OptionsI[]>([]);
  const [mappedTitles, setTitles] = useState<OptionsI[]>([]);
  const [mappedCountries, setCountries] = useState<OptionsI[]>([]);
  const [mappedStates, setStates] = useState<OptionsI[]>([]);
  const [mappedRelationships, setRelationships] = useState<OptionsI[]>([]);
  const [mappedTowns, setTowns] = useState<OptionsI[]>([]);
  const [mappedIDCards, setIDCards] = useState<OptionsI[]>([]);
  const [mappedBranches, setBranches] = useState<OptionsI[]>([]);
  const [mappedIAReportType, setMappedIAReportType] = useState<OptionsI[]>([]);
  const [mappedDepartments, setDepartments] = useState<OptionsI[]>([]);
  const [mappedGLType, setGLType] = useState<OptionsI[]>([]);
  const [mappedCurrency, setCurrency] = useState<OptionsI[]>([]);
  const [mappedRole, setRoles] = useState<OptionsI[]>([]);
  const [mappedStatus, setStatus] = useState<OptionsI[]>([]);
  const [mappedNode, setNode] = useState<OptionsI[]>([]);
  const [mappedGlClassType, setGlClassType] = useState<OptionsI[]>([]);
  const [mappedGlAccount, setGlAccount] = useState<OptionsI[]>([]);
  const [mappedBankproducts, setBankProducts] = useState<OptionsI[]>([]);
  const [mappedBankproductCode, setBankProductCode] = useState<OptionsI[]>([]);
  const [mappedState, setState] = useState<OptionsI[]>([]);
  const [mappedBranchTypes, setBranchTypes] = useState<OptionsI[]>([]);
  const [mappedCity, setCity] = useState<OptionsI[]>([]);
  const [mappedProductType, setProductType] = useState<OptionsI[]>([]);
  const [mappedCommercialBank, setCommercialBank] = useState<OptionsI[]>([]);
  const [nibbsCommercialBank, setNibbsCommercialBank] = useState<OptionsI[]>(
    []
  );
  const [mappedTransactionType, setTransactionType] = useState<OptionsI[]>([]);
  const [mappedChargeConcessionType, setChargeConcessionType] = useState<
    OptionsI[]
  >([]);
  const [mappedZone, setZone] = useState<OptionsI[]>([]);
  const [mappedRegion, setRegion] = useState<OptionsI[]>([]);

  const [mappedClearingBank, setClearingBank] = useState<OptionsI[]>([]);

  const [mappedLoansProduct, setLoansProducts] = useState<OptionsI[]>([]);
  const [mappedLoanPurpose, setLoansPurpoose] = useState<OptionsI[]>([]);
  const [mappedLoanRepayment, setLoansLoanRepayment] = useState<OptionsI[]>([]);
  const [mappedLoansources, setLoansources] = useState<OptionsI[]>([]);
  const [mappedLoanCollateral, setLoanCollateral] = useState<OptionsI[]>([]);
  const [mappedCreditInterests, setCreditInterests] = useState<OptionsI[]>([]);
  const [mappedLoanClass, setLoanClass] = useState<OptionsI[]>([]);
  const [mappedInterests, setInterests] = useState<OptionsI[]>([]);
  const [mappedProductClass, setProductClass] = useState<OptionsI[]>([]);
  const [mappedException, setException] = useState<OptionsI[]>([]);
  const [mappedFrequency, setFrequency] = useState<OptionsI[]>([]);
  const [mappedGLNodeType, setGLNodeType] = useState<OptionsI[]>([]);
  const [mappedProductTypeId, setProductTypeId] = useState<OptionsI[]>([]);
  const [mappedProductClassTypeId, setProductClassTypeId] = useState<
    OptionsI[]
  >([]);
  const [mappedWithBranchCode, setWithBranchCode] = useState<OptionsI[]>([]);

  useEffect(() => {
    const checkbooksArray: OptionsI[] = [];
    checkbooks?.forEach((books: ICheckBooks) => {
      checkbooksArray.push({
        value: books.typeId.toString(),
        name: books.typeDesc
      });
    });
    const ProductTypeIdArray: OptionsI[] = [];
    dataType?.forEach((prodCodeType: IProdCodeType) => {
      ProductTypeIdArray.push({
        value: prodCodeType?.PCode?.toString(),
        name: prodCodeType.PName
      });
    });
    const GlWithBranchCodeArray: OptionsI[] = [];
    dataWithCode?.forEach((prodCodeType: IGLWithBranchCode) => {
      GlWithBranchCodeArray.push({
        value: prodCodeType?.glnumber,
        name: prodCodeType.acctName
      });
    });
    const ProductTypeClassArray: OptionsI[] = [];
    data?.forEach((prodType: IProdType) => {
      ProductTypeClassArray.push({
        value: prodType?.PCode?.toString(),
        name: prodType.PName
      });
    });
    const GlTypeArray: OptionsI[] = [];
    glClasses?.forEach((gltype: IGLTypeClass) => {
      GlTypeArray.push({
        value: gltype.gL_ClassCode.toString(),
        name: gltype.gL_ClassName
      });
    });
    const frequencyArray: OptionsI[] = [];
    frequency?.forEach((freq: IFrequency) => {
      frequencyArray.push({
        value: freq.freqcode.toString(),
        name: freq.freqname
      });
    });
    const exceptionArray: OptionsI[] = [];
    exception?.forEach((exceptions: IException) => {
      exceptionArray.push({
        value: exceptions.exceptioncode.toString(),
        name: exceptions.exceptionDesc
      });
    });
    const productClassArray: OptionsI[] = [];
    products?.forEach((product: IProducts) => {
      productClassArray.push({
        value: product.prodclass?.toString(),
        name: product.moduledesc
      });
    });
    const productCodeArray: OptionsI[] = [];
    products?.forEach((product: IProductClass) => {
      productCodeArray.push({
        value: product.productCode?.toString(),
        name: product.productName
      });
    });
    const interestsArray: OptionsI[] = [];
    interests?.forEach((interest: IInterests) => {
      interestsArray.push({
        value: interest.intcode.toString(),
        name: interest.intname
      });
    });
    const loanClassArray: OptionsI[] = [];
    loanClass?.forEach((loan: ILoanClass) => {
      loanClassArray.push({
        value: loan.code.toString(),
        name: loan.loandesc
      });
    });
    const creditInterestsArray: OptionsI[] = [];
    creditInterests?.forEach((credit: ICreditInterests) => {
      creditInterestsArray.push({
        value: credit.intcode.toString(),
        name: credit.intname
      });
    });
    const regionArray: OptionsI[] = [];
    region?.forEach((regions: IRegionByCode) => {
      regionArray.push({
        value: regions.regionCode.toString(),
        name: regions.regionName
      });
    });
    const clearingArray: OptionsI[] = [];
    clearBanks?.forEach((clear: IGetClearingBank) => {
      clearingArray.push({
        value: clear.bankcode.toString(),
        name: clear.bankname
      });
    });

    const zoneArray: OptionsI[] = [];
    zones?.forEach((zone: IGetZone) => {
      zoneArray.push({
        value: zone.zoneid.toString(),
        name: zone.zoneName
      });
    });

    const chargeConcessionArray: OptionsI[] = [];
    charges?.forEach((charge: IChargeConcessionType) => {
      chargeConcessionArray.push({
        value: charge.chargeCode,
        name: charge.chargeDesc
      });
    });

    const commercialBankArray: OptionsI[] = [];
    commBanks?.forEach((bank: IGetCommercialBank) => {
      commercialBankArray.push({
        value: bank.bankcode,
        name: bank.bankName
      });
    });

    const nibbsCommercialBankArray: OptionsI[] = [];
    allNibbsBank?.forEach((bank: IGetNibbsCommercialBank) => {
      nibbsCommercialBankArray.push({
        value: bank.bankName,
        name: bank.bankName
      });
    });

    const lienReasonArray: OptionsI[] = [];

    lienReason?.forEach((reason: ILienReason) => {
      lienReasonArray.push({
        name: reason.holdreason,
        value: reason.reasoncode
      });
    });

    const transactionTypeArray: OptionsI[] = [];

    details?.forEach((transaction: ITransactionType) => {
      transactionTypeArray.push({
        name: transaction.tranname,
        value: transaction.trancode
      });
    });

    const professionsArray: OptionsI[] = [];

    professions?.forEach((profession: IOccupation) => {
      professionsArray.push({
        name: profession.profname,
        value: profession.profcode?.toString().trim()
      });
    });

    const productTypeArray: OptionsI[] = [];
    productTypes?.forEach((product: IProductType) => {
      productTypeArray.push({
        name: product.producttypedesc,
        value: product.producttypeid
      });
    });

    const sectorsArray: OptionsI[] = [];

    sectors?.forEach((sector: ISector) => {
      sectorsArray.push({
        name: sector.sectorName,
        value: sector.sectorCode?.toString().trim()
      });
    });

    const educationArray: OptionsI[] = [];

    education?.forEach((eachEducation: IEducation) => {
      educationArray.push({
        name: eachEducation.educationname,
        value: eachEducation.educationCode.toString()
      });
    });

    const groupsArray: OptionsI[] = [];

    groups?.forEach((group: IGroup) => {
      groupsArray.push({
        name: group.groupName,
        value: group.groupID
      });
    });

    const accountOfficersArray: OptionsI[] = [];

    officers?.forEach((officer: IAccountOfficers) => {
      accountOfficersArray.push({
        name: officer.officerName as string,
        value: officer.officercode as string
      });
    });

    const allUserArray: OptionsI[] = [];

    users?.forEach((user: IUsers) => {
      allUserArray.push({
        name: user.fullname as string,
        value: user.userid as string
      });
    });

    const titleArray: OptionsI[] = [];

    titles?.forEach((title: ITitle) => {
      titleArray.push({
        name: title.titleName,
        value: title.titleCOde.toString()
      });
    });

    const countriesArray: OptionsI[] = [];

    countries?.forEach((country: ICountries) => {
      countriesArray.push({
        name: country.countryName,
        value: country.countryCode
      });
    });

    const statesArray: OptionsI[] = [];

    states?.forEach((state: IStates) => {
      statesArray.push({
        name: state.stateName,
        value: state.stateCode
      });
    });

    const townArray: OptionsI[] = [];

    towns?.forEach((town: ITown) => {
      townArray.push({
        name: town.townName,
        value: town.townCode
      });
    });

    const relationshipsArray: OptionsI[] = [];

    relationships?.forEach((relatiosnip: IRelationship) => {
      relationshipsArray.push({
        name: relatiosnip.relationname,
        value: relatiosnip.relationid.toString()
      });
    });

    const idCardArray: OptionsI[] = [];

    idCards?.forEach((idCard: IIDTypes) => {
      idCardArray.push({
        name: idCard.idCardName,
        value: idCard.idCardID.toString()
      });
    });

    const branchArray: OptionsI[] = [];

    branches?.forEach((branch: IBranches) => {
      branchArray.push({
        name: branch.branchName,
        value: branch.branchCode
      });
    });

    const iAReportTypeArray: OptionsI[] = [];

    iAReportType?.forEach((reportType: IIAReportType) => {
      iAReportTypeArray.push({
        name: reportType.name,
        value: String(reportType.id)
      });
    });

    const bankproductsArray: OptionsI[] = [];

    bankproducts?.forEach((bankproduct: IBankProducts) => {
      bankproductsArray.push({
        name: bankproduct.productName,
        value: bankproduct?.productCode?.trim()
      });
    });

    const cityArray: OptionsI[] = [];

    towns?.forEach((town: ICity) => {
      cityArray.push({
        name: town.townName,
        value: town.townCode
      });
    });

    const branchTypeArray: OptionsI[] = [];

    branchTypes?.forEach((branchType: IBranchTypes) => {
      branchTypeArray.push({
        name: branchType.branchTypeDesc,
        value: branchType.branchTyID
      });
    });

    const departmentsArray: OptionsI[] = [];

    departments?.forEach((department: IDepartments) => {
      departmentsArray.push({
        name: department.deptName,
        value: department.deptid
      });
    });

    const currenciesArray: OptionsI[] = [];
    currencies?.forEach((currency: ICurrency) => {
      currenciesArray.push({
        name: currency.currencyName,
        value: currency.countryCode
      });
    });

    const glTypeArray: OptionsI[] = [];

    glType?.forEach((glAccount: IGLType) => {
      glTypeArray.push({
        name: glAccount.prodTypeName,
        value: glAccount.prodTypeCode
      });
    });

    const roleArray: OptionsI[] = [];

    roles?.forEach((role: IRoles) => {
      roleArray.push({
        name: role.role_name,
        value: role.role_id
      });
    });

    const statusArray: OptionsI[] = [];

    status?.forEach((statusData: IStatus) => {
      statusArray.push({
        name: statusData.statusDesc,
        value: statusData.statusCode
      });
    });

    const nodeTypeArray: OptionsI[] = [];

    node?.forEach((nodes: INodeType) => {
      nodeTypeArray.push({
        name: nodes.gL_NodeName,
        value: nodes.gL_NodeCode
      });
    });

    const classTypeArray: OptionsI[] = [];

    glClasses?.forEach((glClass: IGLClassType) => {
      classTypeArray.push({
        name: glClass.gL_ClassName,
        value: glClass.gL_ClassCode
      });
    });

    const accountArray: OptionsI[] = [];

    bankgl?.forEach((account: IGLAccount) => {
      accountArray.push({
        name: account.acctName,
        value: account.glNumber
      });
    });

    const stateArray: OptionsI[] = [];
    states?.forEach((state: IStates) => {
      stateArray.push({
        name: state.stateName,
        value: state.stateCode
      });
    });

    const allNationStatesArray: OptionsI[] = [];

    if (Array.isArray(allNationStates)) {
      allNationStates.forEach((state: IStates) => {
        allNationStatesArray.push({
          name: state.stateName,
          value: state.stateCode?.toString().trim()
        });
      });
    }

    const allStateTownsArray: OptionsI[] = [];
    if (Array.isArray(allStateTowns)) {
      allStateTowns?.forEach((town: ITown) => {
        allStateTownsArray.push({
          name: town.townName,
          value: town.townCode
        });
      });
    }

    const glDetailsArray: IGlDetailsOptions[] = [];
    glDetails?.forEach((glDetail: IGlDetails) => {
      glDetailsArray.push({
        name: glDetail.acctname,
        value: glDetail.lastnumber,
        bkBalance: glDetail.bkbalance
      });
    });

    const glNodeArray: OptionsI[] = [];
    gLnode?.forEach((glNode: IGlNode) => {
      glNodeArray.push({
        name: glNode.gl_nodename,
        value: glNode.gl_nodecode
      });
    });

    const glClassArray: OptionsI[] = [];
    gLclass?.forEach((glClass: IGlClass) => {
      glClassArray.push({
        name: glClass.gl_classname,
        value: glClass.gl_classcode
      });
    });

    const loanProductArray: OptionsI[] = [];
    loans?.forEach((loan: ILoans) => {
      loanProductArray.push({
        name: loan.productname,
        value: loan.productcode
      });
    });

    const loansPurposeArray: OptionsI[] = [];
    loansPurpose?.forEach((loan: IProductLoanPurpose) => {
      loansPurposeArray.push({
        name: loan.purposeName,
        value: loan.purposeCode
      });
    });

    const productLoanRepaymentArray: OptionsI[] = [];
    repaymentTypes?.forEach((loan: IProductLoanRepayment) => {
      productLoanRepaymentArray.push({
        name: loan.repaydesc,
        value: loan.repayid
      });
    });

    const loansourcesArray: OptionsI[] = [];
    loansources?.forEach((loan: ILoansource) => {
      loansourcesArray.push({
        name: loan.loansourcedesc,
        value: loan.loansourceid
      });
    });

    const loanCollateraArray: OptionsI[] = [];
    collaterals?.forEach((colla: ILoanCollateral) => {
      loanCollateraArray.push({
        name: colla.collateralDesc,
        value: colla.collateralID
      });
    });

    setMappedStateTowns(allStateTownsArray);
    setMappedNationStates(allNationStatesArray);
    setMappedGlClass(glClassArray);
    setMappedGlNode(glNodeArray);
    setMappedGlDetails(glDetailsArray);
    setMappedCheckBooks(checkbooksArray);
    setLienReason(lienReasonArray);
    setProfession(professionsArray);
    setSector(sectorsArray);
    setEducation(educationArray);
    setGroups(groupsArray);
    setAccountOfficers(accountOfficersArray);
    setMappedUsers(allUserArray);
    setCountries(countriesArray);
    setStates(statesArray);
    setTowns(townArray);
    setRelationships(relationshipsArray);
    setIDCards(idCardArray);
    setDepartments(departmentsArray);
    setBranches(branchArray);
    setMappedIAReportType(iAReportTypeArray);
    setTitles(titleArray);
    setCurrency(currenciesArray);
    setGLType(glTypeArray);
    setRoles(roleArray);
    setStatus(statusArray);
    setNode(nodeTypeArray);
    setGlClassType(classTypeArray);
    setGlAccount(accountArray);
    setBankProducts(bankproductsArray);
    setState(stateArray);
    setBranchTypes(branchTypeArray);
    setCity(cityArray);
    setProductType(productTypeArray);
    setCommercialBank(commercialBankArray);
    setNibbsCommercialBank(nibbsCommercialBankArray);
    setTransactionType(transactionTypeArray);
    setChargeConcessionType(chargeConcessionArray);
    setZone(zoneArray);
    setClearingBank(clearingArray);
    setGLNodeType(GlTypeArray);
    setLoansProducts(loanProductArray);
    setLoansPurpoose(loansPurposeArray);
    setLoansLoanRepayment(productLoanRepaymentArray);
    setLoansources(loansourcesArray);
    setLoanCollateral(loanCollateraArray);
    setRegion(regionArray);
    setCreditInterests(creditInterestsArray);
    setLoanClass(loanClassArray);
    setInterests(interestsArray);
    setProductClass(productClassArray);
    setException(exceptionArray);
    setFrequency(frequencyArray);
    setBankProductCode(productCodeArray);
    setProductTypeId(ProductTypeIdArray);
    setProductClassTypeId(ProductTypeClassArray);
    setWithBranchCode(GlWithBranchCodeArray);
  }, [
    bankgl,
    bankproducts,
    branchTypes,
    branches,
    iAReportType,
    charges,
    checkbooks,
    clearBanks,
    commBanks,
    allNibbsBank,
    countries,
    currencies,
    departments,
    details,
    education,
    gLclass,
    gLnode,
    glClasses,
    glDetails,
    glType,
    groups,
    idCards,
    lienReason,
    node,
    officers,
    users,
    productTypes,
    professions,
    relationships,
    roles,
    sectors,
    states,
    status,
    titles,
    towns,
    zones,
    loans,
    loansPurpose,
    repaymentTypes,
    loansources,
    collaterals,
    region,
    allNationStates,
    allStateTowns,
    creditInterests,
    loanClass,
    interests,
    products,
    exception,
    frequency,
    data,
    dataType,
    dataWithCode
  ]);

  return {
    mappedStateTowns,
    mappedNationStates,
    mappedCheckBooks,
    mappedLienReason,
    mappedProfessions,
    mappedSectors,
    mappedEducation,
    mappedGroups,
    mappedAccountOfficers,
    mappedUsers,
    mappedTitles,
    mappedCountries,
    mappedStates,
    mappedTowns,
    mappedRelationships,
    mappedIDCards,
    mappedBranches,
    mappedIAReportType,
    mappedDepartments,
    mappedGLType,
    mappedCurrency,
    mappedRole,
    mappedStatus,
    mappedNode,
    mappedGlClassType,
    mappedGlAccount,
    mappedBankproducts,
    mappedState,
    mappedBranchTypes,
    mappedCity,
    mappedProductType,
    mappedCommercialBank,
    nibbsCommercialBank,
    mappedTransactionType,
    mappedChargeConcessionType,
    mappedZone,
    mappedClearingBank,
    mappedGlClasses,
    mappedGlDetails,
    mappedGlNodes,
    mappedLoansProduct,
    mappedLoanPurpose,
    mappedLoanRepayment,
    mappedLoansources,
    mappedLoanCollateral,
    mappedRegion,
    mappedCreditInterests,
    mappedLoanClass,
    mappedInterests,
    mappedProductClass,
    mappedException,
    mappedFrequency,
    mappedGLNodeType,
    mappedBankproductCode,
    mappedProductTypeId,
    mappedProductClassTypeId,
    mappedWithBranchCode
  };
};
