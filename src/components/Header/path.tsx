export default function getPath(props : string) {
    let path : string = props;
    path = path.replaceAll('/', ' 〉');
    return ( path
    );
  }
  