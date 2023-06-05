interface ITrack {
  id: string;
  name: string;
  track_number: number | string;
}

interface IAlbum {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

export { IAlbum, ITrack };
