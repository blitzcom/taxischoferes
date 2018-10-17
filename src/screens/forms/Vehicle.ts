import withForm from './form';

export default withForm(
  'VEHÍCULO',
  'vehicle',
  {
    brand: '',
    model: '',
    plate: '',
  },
  {
    brand: 'MARCA',
    model: 'MODELO',
    plate: 'PLACA',
  }
)();
