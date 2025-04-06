import './App.css'
import CarList from './Carlist'
import Container from "@mui/material/Container"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

function App() {


  return (
    <Container>
      <AppBar position = 'relative'>
        <Toolbar>
          <Typography variant="h6">CarList</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </Container>
  )
}

export default App
