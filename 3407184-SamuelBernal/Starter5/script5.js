// ============================================
// 🎧 Dashboard de Análisis - Barrio Beats Radio
// ============================================

const streamsData = [
  {
    id: 'STR001',
    date: '2024-01-15',
    listener: 'Ana García',
    zone: 'North',
    tracks: [
      { track: 'Boom Bap Classic', genre: 'Hip Hop', plays: 1, duration: 180 },
      { track: 'Lo-fi Chill', genre: 'Lo-fi', plays: 2, duration: 200 },
    ],
    status: 'live',
  },
  {
    id: 'STR002',
    date: '2024-01-18',
    listener: 'Luis Martínez',
    zone: 'South',
    tracks: [
      { track: 'Underground Flow', genre: 'Hip Hop', plays: 3, duration: 210 },
      { track: 'Street Vibes', genre: 'Boom Bap', plays: 2, duration: 190 },
    ],
    status: 'live',
  },
  {
    id: 'STR003',
    date: '2024-02-05',
    listener: 'María López',
    zone: 'East',
    tracks: [
      { track: 'Lo-fi Study', genre: 'Lo-fi', plays: 4, duration: 240 },
      { track: 'Night Beats', genre: 'Hip Hop', plays: 1, duration: 180 },
    ],
    status: 'live',
  },
  {
    id: 'STR004',
    date: '2024-02-12',
    listener: 'Carlos Ruiz',
    zone: 'West',
    tracks: [
      { track: 'Boom Bap Classic', genre: 'Hip Hop', plays: 2, duration: 180 },
    ],
    status: 'offline',
  },
];

// ============================================
// FUNCIÓN 1: Todos los tracks
// ============================================
const getAllTracks = streams => {
  return streams.flatMap(stream =>
    stream.tracks.map(track => ({
      streamId: stream.id,
      date: stream.date,
      zone: stream.zone,
      ...track
    }))
  );
};

// ============================================
// FUNCIÓN 2: Total de plays por stream
// ============================================
const getStreamTotals = streams => {
  return streams.map(stream => {
    const totalPlays = stream.tracks.reduce(
      (sum, t) => sum + t.plays,
      0
    );

    return {
      id: stream.id,
      listener: stream.listener,
      date: stream.date,
      status: stream.status,
      totalPlays
    };
  });
};

// ============================================
// FUNCIÓN 3: Top listeners
// ============================================
const getTopListeners = (streams, n = 5) => {
  return Object.values(
    streams
      .filter(s => s.status === 'live')
      .reduce((acc, stream) => {
        const total = stream.tracks.reduce(
          (sum, t) => sum + t.plays,
          0
        );

        if (!acc[stream.listener]) {
          acc[stream.listener] = {
            listener: stream.listener,
            totalPlays: 0,
            sessionCount: 0
          };
        }

        acc[stream.listener].totalPlays += total;
        acc[stream.listener].sessionCount++;

        return acc;
      }, {})
  )
    .sort((a, b) => b.totalPlays - a.totalPlays)
    .slice(0, n);
};

// ============================================
// FUNCIÓN 4: Plays por zona
// ============================================
const getPlaysByZone = streams => {
  return streams
    .filter(s => s.status === 'live')
    .reduce((acc, stream) => {
      const total = stream.tracks.reduce(
        (sum, t) => sum + t.plays,
        0
      );

      acc[stream.zone] = (acc[stream.zone] || 0) + total;

      return acc;
    }, {});
};

// ============================================
// FUNCIÓN 5: Plays por género
// ============================================
const getPlaysByGenre = streams => {
  return streams
    .filter(s => s.status === 'live')
    .flatMap(s => s.tracks)
    .reduce((acc, track) => {
      acc[track.genre] = (acc[track.genre] || 0) + track.plays;
      return acc;
    }, {});
};

// ============================================
// FUNCIÓN 6: Tracks más reproducidos
// ============================================
const getTopTracks = (streams, limit = 10) => {
  return Object.values(
    streams
      .filter(s => s.status === 'live')
      .flatMap(s => s.tracks)
      .reduce((acc, track) => {
        if (!acc[track.track]) {
          acc[track.track] = {
            track: track.track,
            totalPlays: 0,
            totalDuration: 0
          };
        }

        acc[track.track].totalPlays += track.plays;
        acc[track.track].totalDuration += track.duration * track.plays;

        return acc;
      }, {})
  )
    .sort((a, b) => b.totalPlays - a.totalPlays)
    .slice(0, limit);
};

// ============================================
// FUNCIÓN 7: Filtrar por fecha
// ============================================
const filterStreamsByDate = (streams, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return streams.filter(s => {
    const date = new Date(s.date);
    return date >= start && date <= end;
  });
};

// ============================================
// FUNCIÓN 8: Estadísticas generales
// ============================================
const getGeneralStats = streams => {
  const live = streams.filter(s => s.status === 'live');

  const totals = live.map(s =>
    s.tracks.reduce((sum, t) => sum + t.plays, 0)
  );

  const totalPlays = totals.reduce((a, b) => a + b, 0);
  const streamCount = live.length;
  const avgPlays = streamCount ? totalPlays / streamCount : 0;
  const maxPlays = Math.max(...totals);
  const minPlays = Math.min(...totals);

  const totalTracks = live
    .flatMap(s => s.tracks)
    .reduce((sum, t) => sum + t.plays, 0);

  return {
    totalPlays,
    streamCount,
    avgPlays,
    maxPlays,
    minPlays,
    totalTracks
  };
};

// ============================================
// FUNCIÓN 9: Tendencia mensual
// ============================================
const getMonthlyTrend = streams => {
  const grouped = streams
    .filter(s => s.status === 'live')
    .reduce((acc, stream) => {
      const month = stream.date.slice(0, 7);

      const total = stream.tracks.reduce(
        (sum, t) => sum + t.plays,
        0
      );

      if (!acc[month]) {
        acc[month] = { month, total, count: 0 };
      }

      acc[month].total += total;
      acc[month].count++;

      return acc;
    }, {});

  return Object.values(grouped).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
};

// ============================================
// FUNCIÓN 10: Reporte completo
// ============================================
const generateReport = streams => {
  return {
    generatedAt: new Date().toISOString(),
    stats: getGeneralStats(streams),
    topListeners: getTopListeners(streams, 5),
    playsByZone: getPlaysByZone(streams),
    playsByGenre: getPlaysByGenre(streams),
    topTracks: getTopTracks(streams, 5),
    monthlyTrend: getMonthlyTrend(streams)
  };
};