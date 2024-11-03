import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'

export default function Dashboard() {
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWRkeDU2IiwiYSI6ImNtMHcwY2xxbjBibDgycHBwcTFiMm15emIifQ.HxBTOr7pSc1tcazcdH9PVA'
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-63.15731667113016, -17.773792444766613],
        zoom: 11,
        maxZoom: 15,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-left')

      new mapboxgl.Marker()
        .setLngLat([-63.15731667113016, -17.773792444766613])
        .addTo(map)

      return () => map.remove()
    }
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        {/*<TopNav links={topNav} />*/}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div>
          <div
            ref={mapContainer}
            style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}
