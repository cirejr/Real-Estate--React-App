import {Flex, Box, Text, Avatar, Spacer} from '@chakra-ui/react';
import {FaBed, FaBath} from 'react-icons/fa';
import {BsGridFill} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';
import millify from 'millify';

import {baseUrl, fetchApi} from '../../utils/fetchApi'
import ImageScrollbar from '../../components/ImageScrollbar'

const PropertyDetails = ({ propertyDetails : { price, rentFrequency, rooms, title, agency, baths, isVerified, area, description, type, purpose, furnishingStatus, amenities, photos} }) => (
	<Box maxWidth="1000px" margin="auto" p="4">
		{photos && <ImageScrollbar data={photos}/>}
		<Box w={"full"} p="6" >
			<Flex paddingTop="2" alignItems="center" justifyContent="space-between">
				<Flex alignItems="center">
					<Box paddingRight={"3"} color={"green.400"}>{isVerified && <GoVerified />}</Box>
					<Text fontWeight={"bold"} fontSize={"lg"}>AED {millify(price)}{rentFrequency && `/${rentFrequency}`} </Text>
				</Flex>
				<Box>
					<Avatar size="md" src={agency?.logo?.url} />
				</Box>
			</Flex>
				<Flex alignItems={"center"} justifyContent={"space-between"} p="1" w={"250px"} color="blue.400" >
					{rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
				</Flex>
				<Box mt={"2"}>
					<Text fontSize={"lg"} fontWeight="bold" mb={"2"}>
						{title}
					</Text>
					<Text lineHeight={"2"} color="gray.600">
						{description}
					</Text>
				</Box>
				<Flex flexWrap={"wrap"} textTransform="uppercase" justifyContent={"space-between"} >
					<Flex justifyContent={"space-between"} w="400px" borderBottom={"1px"} borderColor="gray.100" p={"3"}>
						<Text>Type</Text>
						<Text fontWeight={"bold"}>{type}</Text>
					</Flex>
					<Flex justifyContent={"space-between"} w="400px" borderBottom={"1px"} borderColor="gray.100" p={"3"}>
						<Text>Purpose</Text>
						<Text fontWeight={"bold"}>{purpose}</Text>
					</Flex>
					{furnishingStatus && (	
						<Flex justifyContent={"space-between"} w="400px" borderBottom={"1px"} borderColor="gray.100" p={"3"}>
							<Text>Furnishing Status</Text>
							<Text fontWeight={"bold"}>{furnishingStatus}</Text>
						</Flex>
					)}
				</Flex>
				<Box>
					{amenities.length && <Text fontSize={"2xl"} fontWeight="black" mt={"5"}>Amenities</Text>}
					<Flex flexWrap={"wrap"}>
						{amenities.map(item => (
							item.amenities.map(amenity =>(
								<Text 
									key={amenity.text}
									fontWeight="bold"
									fontSize={"l"}
									color={"blue.400"}
									p="2"
									bg={"gray.200"}
									m="1"
									borderRadius={"5"}
								>{amenity.text}</Text>
							))
						))}
					</Flex>
				</Box>
		</Box>
	</Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id }}){
	const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

	return {
		props: {
			propertyDetails : data
		}
	}
}