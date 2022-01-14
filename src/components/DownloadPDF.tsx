import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import InvoicePage from './InvoicePage'
import Calc from './Calc'
import moment from 'moment'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

let isPaneOpenLeft = true

interface Props {
  data: Invoice
}

const Download: FC<Props> = ({ data }) => {
  const [state, setState] = useState({isOpen: false});
  const [show, setShow] = useState<boolean>(false)
  const datetime = moment();

  useEffect(() => {
    setShow(false)
   
    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  return (
    <div>
      <div className={'download-pdf ' + (!show ? 'loading' : '')} title="Save PDF">
      {show && (
        <PDFDownloadLink
          document={<InvoicePage pdfMode={true} data={data} />}
          fileName={`${data.invoiceTitle ? data.invoiceTitle.toLowerCase() : `factura - ${datetime}` }.pdf`}
          aria-label="Guardar PDF"
        ></PDFDownloadLink>
      )}
      </div>
      <div className={'show-calc'}  onClick={() => setState({isOpen: true}) }></div>
      <SlidingPane
        className="side-pane-calc"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isOpen}
        subtitle=""
        width="500px"
        onRequestClose={() => setState({isOpen: false}) }        
      >
      <Calc />
    </SlidingPane>
    </div>
    
    
  )
}

export default Download
