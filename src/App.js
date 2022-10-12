import './App.css';
import { connect } from 'react-redux';
import { set_address } from './actions';
import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from "react-google-places-autocomplete";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import { Container, Box, Typography } from '@mui/material';

function App({ isLoading, all_addresses, setAddresses, setLoading }) {
  const [address, setAddress] = useState();

  const getAddressObject = (address_components) => {
    const country = address_components.filter((add) => add.types.includes('country'))?.[0]?.long_name || ""
    const province = address_components.filter((add) => add.types.includes('administrative_area_level_1'))?.[0]?.long_name || ""
    const city = address_components.filter((add) => add.types.includes('administrative_area_level_2'))?.[0]?.long_name || ""
    const subArea = address_components.filter((add) => add.types.includes('administrative_area_level_4'))?.[0]?.long_name || ""
    const street_address = address_components.filter((add) => add.types.includes('route'))?.[0]?.long_name || ""
    const street_number = address_components.filter((add) => add.types.includes('street_number'))?.[0]?.long_name || ""
    const blok = address_components.filter((add) => add.types.includes('subpremise'))?.[0]?.long_name || ""

    const complete_address = street_address + " " + blok + " " + street_number + ", " + subArea + city + " - " + province + ", " + country;
    return complete_address;
  };

  useEffect(() => {
    if (address) {
      const func = async () => {
        const geocodeObj = address && address.value && (await geocodeByPlaceId(address.value.place_id));
        const addressObject = geocodeObj && getAddressObject(geocodeObj[0].address_components);
        setAddresses(addressObject)
      };
      func();
    }
  }, [address]);

  return (
    <Container maxWidth="lg" className=''>
      <Box sx={{ p: 10, border: '1px solid #ccc'}}>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyDSKsr1WK1DcCmD49tsJ1nZMgKT8RJC9EE"
          selectProps={{
            isClearable: true,
            value: address,
            onChange: (val) => {
              setAddress(val);
            }
          }}
        />

        <Typography variant="h6" gutterBottom sx={{ margin: '2rem .5rem 0' }}>
          List of Selected Addresses:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {all_addresses?.map((address, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`address ${index + 1}`} secondary={address} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    all_addresses: state.all_addresses,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddresses: (address) => {
      dispatch(set_address(address))
    },
    setLoading: (isLoading, value) => {
      dispatch(isLoading(value))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
