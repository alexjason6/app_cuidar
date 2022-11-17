import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../contexts/auth';

import SmartService from '../services/SmartService';

interface TrackContextData {
  devices: [
    {
      tail: any;
      lat: number;
      lng: number;
      id: string;
      name: any;
      online: string;
      speed: any;
      timestamp(timestamp: any): unknown;
      stop_duration: any;
      "title": "Ungrouped",
      "items": [
        {
          "id": 3,
          "name": "Device name",
          "online": "offline",
          "alarm": "",
          "time": "2016-04-29 21:01:26",
          "timestamp": 1461956486,
          "acktimestamp": 0,
          "speed": 0,
          "lat": 55.922996,
          "lng": 23.3466906,
          "course": "0",
          "power": "-",
          "altitude": 175,
          "address": "-",
          "protocol": "osmand",
          "driver": "Drive first",
          "sensors": [
            {
              "name": "Sensor test",
              "value": "- nn",
              "show_in_popup": "0"
            },
            {
              "name": "test acc",
              "value": "- nn",
              "show_in_popup": "1"
            }
          ],
          "services": [
            {
              "name": "Test service",
              "value": "Engine hours Left (1000 )"
            }
          ],
          "tail": [
            {
              "lat": "55.91986482",
              "lng": "23.3255625"
            },
            {
              "lat": "55.91590619",
              "lng": "23.33778733"
            },
            {
              "lat": "55.91928624",
              "lng": "23.34572509"
            },
            {
              "lat": "55.92336524",
              "lng": "23.34666575"
            },
            {
              "lat": "55.92297793",
              "lng": "23.34665713"
            }
          ],
          "distance_unit_hour": "kph",
          "device_data": {
            "id": "3",
            "user_id": null,
            "traccar_device_id": "3",
            "icon_id": "8",
            "active": "1",
            "deleted": "0",
            "name": "Device name",
            "imei": "789832",
            "fuel_measurement_id": "1",
            "fuel_quantity": "0.00",
            "fuel_price": "0.00",
            "fuel_per_km": "0.00",
            "sim_number": "",
            "device_model": "",
            "plate_number": "",
            "vin": "",
            "registration_number": "",
            "object_owner": "",
            "expiration_date": "0000-00-00",
            "tail_color": "#33cc33",
            "tail_length": "5",
            "engine_hours": "gps",
            "detect_engine": "gps",
            "min_moving_speed": "6",
            "min_fuel_fillings": "10",
            "min_fuel_thefts": "10",
            "snap_to_road": "0",
            "created_at": "2016-04-25 16:21:19",
            "updated_at": "2016-06-26 15:52:46",
            "pivot": {
              "user_id": "2",
              "device_id": "3",
              "group_id": null,
              "current_driver_id": "1",
              "active": "1",
              "timezone_id": null
            },
            "group_id": null,
            "current_driver_id": "1"
          }
        }
      ]
    }
  ];
  error: boolean;
  tokenAssociadoGPS: string;
  loading: boolean;
  cpfExtracted: string;
  loginSmart(): void;
  getDevices(): void;
}

const TrackContext = createContext<TrackContextData>({} as TrackContextData);

export const TrackProvider: React.FC = ({children}) => {
  const {user} = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let [devices, setDevices] = useState<any>();
  const [tokenAssociadoGPS, setTokenAssociadoGPS] = useState('');
  const [cpfExtracted, setCpfExtracted] = useState('');

  useEffect(() => {
    async function pegaUser() {
      const associado = await AsyncStorage.getItem(
        '@CUIDAR:cpfAssociadoExtracted',
      );
      setCpfExtracted(associado);
    }
    pegaUser();
  }, []);

  async function loginSmart() {
    await SmartService.signInEmail(user.email)
    .then((response) => {
      if (response.status === 1) {
        setTokenAssociadoGPS(response.user_api_hash);
      }

    })
    .catch((response) => {
      if (response.status !== 1) {
        loginSmartCPF();
      }
    });
  }

  async function loginSmartCPF() {
    await SmartService.signInCpf(cpfExtracted)
    .then((response) => {
      if (response.status === 1) {
        setTokenAssociadoGPS(response.user_api_hash);
      } else {
        setError(true);
      }
    });
  }

  async function getDevices() {
    await SmartService.getDevice(tokenAssociadoGPS)
    .then((response) => {

      if (response.length === 0) {
        setError(true);
      }

      setDevices(response[0].items);
      setError(false);
    });
    setLoading(false);
  }

  return (
    <TrackContext.Provider
      value={{
        devices,
        error,
        tokenAssociadoGPS,
        loading,
        cpfExtracted,
        loginSmart,
        getDevices,
      }}>
      {children}
    </TrackContext.Provider>
  );
};

export default TrackContext;
