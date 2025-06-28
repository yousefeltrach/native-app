import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {

 const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    Reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  // const handleSearch = (text: string) => {
  //   setSearchQuery(text);
  // };

    // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

     
      } else {
        Reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  
  
  return (
    <View className='flex-1 bg-primary '>
      <Image source={images.bg} className='absolute flex-1 w-full z-0 ' resizeMode='cover' />
      <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieCard {...item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <> 
        <View className='flex-row w-full justify-center items-center mt-20 '>
          <Image source={icons.logo} className='w-12 h-10' />
          
        </View>
        <View className='py-5 '>
                <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={(text : string) => setSearchQuery(text)}
              />
            
        </View>
        {loading && (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className='my-3' />
        )} {error && (
          <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text> 
        )}
        {!loading && !error && searchQuery .trim() && movies?.length > 0 && (
          <Text className='text-xl text-white font-bold '>
            Search Results for {' '}
            <Text className='text-accent'>
              {searchQuery} </Text>
          </Text>
          )}

        </>
        
      }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search