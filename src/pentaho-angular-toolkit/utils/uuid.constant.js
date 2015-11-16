( function () {

  angular.module( 'vertex.utils' ).constant( 'uuid' , uuid );

  function S4 ( max ) {
    return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
  }

  function uuid () {
    return ( S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4() );
  }

} )();