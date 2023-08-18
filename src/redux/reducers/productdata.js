import { PRODUCT_DATA,ADD_ITEM,REMOVE_ITEM} from "../actions/types";



function createData(name, calories, fat, carbs, protein) {
  
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
const initialState = {
  productdata : {
    rows : [
      createData('Vikas', 305, 3.7, 67, 4.3),
      createData('Donut', 452, 25.0, 51, 4.9),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
      createData('Honeycomb', 408, 3.2, 87, 6.5),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Jelly Bean', 375, 0.0, 94, 0.0),
      createData('KitKat', 518, 26.0, 65, 7.0),
      createData('Lollipop', 392, 0.2, 98, 0.0),
      createData('Marshmallow', 318, 0, 81, 2.0),
      createData('Nougat', 360, 19.0, 9, 37.0),
      createData('Oreo', 437, 18.0, 63, 4.0),
    ],
     headCells : [
      {
        id: 'Coustomer',
        numeric: false,
        disablePadding: true,
        label: 'Coustomer',
      },
      {
        id: 'CoustomerId',
        numeric: true,
        disablePadding: false,
        label: 'CoustomerId',
      },
      {
        id: 'PendingTask',
        numeric: true,
        disablePadding: false,
        label: 'Pending Task',
      },
      {
        id: 'Regestor DATE',
        numeric: true,
        disablePadding: false,
        label: 'Regestor DATE'
      },
      {
        id: 'Service name',
        numeric: true,
        disablePadding: false,
        label: 'Service name',
      },
      {
        id: 'Date of birth',
        numeric: true,
        disablePadding: false,
        label: 'Date of birth',
      },
      {
        id: 'Actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
      },
    ]
  },
  cartidtem: []
}

export default function (state = initialState, action){
    const { type, payload } = action;
    console.log(payload)
    switch (type) {
        case PRODUCT_DATA:
            return {
              ...state,
              productdata: payload,
              
            };
            case ADD_ITEM:
            state.cartidtem.push(payload)
             
              return {
                ...state,
                
                
              };
              case REMOVE_ITEM:
                return {
                  ...state,
                  cartidtem : payload
                 
                  
                };
          
          default:
            return state.productdata;
    }
}