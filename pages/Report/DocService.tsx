import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html: any, eventName: string) => {
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: `${eventName}.pdf`,
      margin: '1.75cm',
      forcePageBreak: '.candidateCard',
    })
  }
}

const Doc = new DocService();
export default Doc;
