import { Controller, Get, Param, Response } from '@nestjs/common';
import { DocumentService } from '../generation/document.service';

@Controller()
export class DocumentController {
  constructor(private readonly appService: DocumentService) {}

  @Get(':documentUid')
  async getHtml(@Param('documentUid') documentUid: string, @Response() res) {
    res.status(200).send(await this.appService.getHtml(documentUid));
  }
}
