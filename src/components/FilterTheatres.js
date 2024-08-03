const filterShowsByDate = (data, selectedDate) => {

    if (!selectedDate) {
      console.error('Invalid selectedDate');
      return data;
    }

    const formattedSelectedDate = selectedDate.split('T')[0];
    const filteredData = {
      ...data,
      theatres: data.theatres.map(theatre => ({
        ...theatre,
        shows: theatre.shows.filter(show => show.startTime.startsWith(formattedSelectedDate))
      })).filter(theatre => theatre.shows.length > 0) 
    };
  
    return filteredData;
  };
    
  
  export default filterShowsByDate;