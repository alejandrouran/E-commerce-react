const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Tu configuración de Webpack aquí
  
  plugins: [
    // Otros plugins que puedas tener
    
    // Agrega CleanWebpackPlugin para limpiar la carpeta de salida
    new CleanWebpackPlugin(),
  ],
};
