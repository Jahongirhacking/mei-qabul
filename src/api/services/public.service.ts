export interface PublicSpecialtyByEduType {
  eduType: string
  specialities: PublicSpecialty[]
}

export type DegreeAndContractPrice = {
  speciality: string
  degree: string
  eduType: string
  specialityCode: string
  contractPrice: number
}

export interface PublicSpecialty {
  description: string
  speciality: string
  // degree: string
  eduType: string
  specialityCode: string
  // contractPrice: number
  degreeAndContractPrices: DegreeAndContractPrice[]
}

// export const useGetPublicSpecialties = () =>
//   useGet<PublicSpecialtyByEduType[]>(
//     '/admission/specialities',
//     {},
//     { staleTime: 6 * 60 * 60 * 1000 }
//   )
