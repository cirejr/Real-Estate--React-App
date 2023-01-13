import {useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {Flex, Box, Icon, Text} from '@chakra-ui/react';
import {BsFilter} from 'react-icons/bs';
import {fetchApi, baseUrl} from '../utils/fetchApi'

import SearchFilters  from '../components/SearchFilters'
import Property  from '../components/Property'

const Search = ({ properties }) => {

	const noResult = "https://raw.githubusercontent.com/adrianhajdin/projects_realestate/ee08b2a94bb7eda952e51bc854b64c16dc36d91b/assets/images/noresult.svg"

	const [searchFilters, setSearchFilters] = useState(false);
	const router = useRouter();

	return(
		<Box>
			<Flex
				cursor="pointer"
				bg={"gray.100"}
				borderBottom="1px"
				borderColor={"gray.200"}
				p="2"
				fontWeight={"black"}
				fontSize="lg"
				justifyContent={"center"}
				alignItems="center"
				gap={2}
				onClick={()=>(setSearchFilters(prevSearchFilters => !prevSearchFilters ))}
			>
				<Text>Search Property By Filters</Text>
				<Icon as={BsFilter} w="7" />
			</Flex>
			{searchFilters && <SearchFilters />}
			<Text fontSize={"2xl"} p="2" fontWeight={"bold"}>
				Properties {router.query.purpose}
			</Text>
			<Flex flexWrap={"wrap"}>
				{properties.map(property => <Property property={property} id={property.id} />)}
			</Flex>
			{properties.length === 0 && (
				<Flex justifyContent={"center"} alignItems="center" flexDir={"column"} marginY={"5"}>
					<Image src={noResult} alt="no result" width={200} height="200"/>
					<Text fontSize={"2xl"} marginTop="3">No Results found</Text>
				</Flex>
			)}
		</Box>
	)
}

export default Search;

export async function getServerSideProps({ query }) {	
	const purpose = query.purpose || 'for-rent'
	const rentFrequency = query.rentFrequency || 'yearly';
  	const minPrice = query.minPrice || '0';
  	const maxPrice = query.maxPrice||'1000000';
  	const roomsMin = query.roomsMin || '0';
  	const bathsMin = query.bathsMin || '0';
  	const sort = query.sort || 'price-desc';
  	const areaMax = query.areaMax || '35000';
  	const locationExternalIDs = query.locationExternalIDs || '5002';
  	const categoryExternalID = query.categoryExternalID || '4';

  	const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  	return {
    	props: {
     		properties: data?.hits,
    	},
  	};
}