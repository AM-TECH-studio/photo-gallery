
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { MOCK_PHOTOS } from '../constants';

export interface Photo {
  id: string;
  url: string;
  album: string;
  tags: string[];
}

interface PhotoContextType {
  photos: Photo[];
  recycleBin: Photo[]; // Stack
  uploadQueue: Photo[]; // Queue
  albums: { name: string; icon: string; id: string }[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  deletePhoto: (id: string) => void;
  undoDelete: () => void;
  uploadPhoto: (url: string) => void;
  processUpload: () => void;
  filteredPhotos: Photo[];
  indexedPhotos: Map<string, Photo[]>; // Hash Table simulation
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

const INITIAL_PHOTOS: Photo[] = MOCK_PHOTOS.map((url, i) => ({
  id: `p-${i}`,
  url,
  album: i % 2 === 0 ? 'family' : 'vacation',
  tags: i % 2 === 0 ? ['home', 'people'] : ['nature', 'travel'],
}));

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>(INITIAL_PHOTOS);
  const [recycleBin, setRecycleBin] = useState<Photo[]>([]);
  const [uploadQueue, setUploadQueue] = useState<Photo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const albums = useMemo(() => [
    { id: 'family', name: 'Family', icon: '🏠' },
    { id: 'vacation', name: 'Vacation', icon: '✈️' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'work', name: 'Work', icon: '💻' },
  ], []);

  // Hash Table Implementation: indexing photos by tags and albums
  const indexedPhotos = useMemo(() => {
    const map = new Map<string, Photo[]>();
    photos.forEach(p => {
      // Index by tags
      p.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        const existing = map.get(normalizedTag) || [];
        if (!existing.find(item => item.id === p.id)) {
          map.set(normalizedTag, [...existing, p]);
        }
      });
      // Index by album
      const normalizedAlbum = p.album.toLowerCase();
      const albumPhotos = map.get(normalizedAlbum) || [];
      if (!albumPhotos.find(item => item.id === p.id)) {
        map.set(normalizedAlbum, [...albumPhotos, p]);
      }
    });
    return map;
  }, [photos]);

  const deletePhoto = useCallback((id: string) => {
    const photoToDelete = photos.find(p => p.id === id);
    if (photoToDelete) {
      setPhotos(prev => prev.filter(p => p.id !== id));
      setRecycleBin(prev => [...prev, photoToDelete]); // Push to stack
    }
  }, [photos]);

  const undoDelete = useCallback(() => {
    if (recycleBin.length > 0) {
      const lastDeleted = recycleBin[recycleBin.length - 1];
      setRecycleBin(prev => prev.slice(0, -1)); // Pop from stack
      setPhotos(prev => [...prev, lastDeleted]);
    }
  }, [recycleBin]);

  const uploadPhoto = useCallback((url: string) => {
    const newPhoto: Photo = {
      id: `u-${Date.now()}`,
      url,
      album: 'work',
      tags: ['new', 'upload'],
    };
    setUploadQueue(prev => [...prev, newPhoto]); // Enqueue
  }, []);

  const processUpload = useCallback(() => {
    if (uploadQueue.length > 0) {
      const [next, ...remaining] = uploadQueue;
      setUploadQueue(remaining); // Dequeue
      setPhotos(prev => [next, ...prev]);
    }
  }, [uploadQueue]);

  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return photos;
    const q = searchQuery.toLowerCase().trim();
    
    // Demonstrate O(1) retrieval using our Map index
    const results = indexedPhotos.get(q);
    if (results) return results;

    // Fallback for partial matches (O(N)) - though in a strict CS demo we might disable this
    return photos.filter(p => 
      p.album.toLowerCase().includes(q) || 
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [photos, searchQuery, indexedPhotos]);

  return (
    <PhotoContext.Provider value={{
      photos,
      recycleBin,
      uploadQueue,
      albums,
      searchQuery,
      setSearchQuery,
      deletePhoto,
      undoDelete,
      uploadPhoto,
      processUpload,
      filteredPhotos,
      indexedPhotos
    }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) throw new Error('usePhotos must be used within a PhotoProvider');
  return context;
};
