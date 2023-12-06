import { Loader } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

const FullPageLoader = () => {
  return (
    <Vertical mih={"100vh"} miw={"100vw"} fullH fullW center>
      <Loader />
    </Vertical>
  )
}

export default FullPageLoader
