import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportGeneratorService } from './services/report-generator.service';

@Module({
  controllers: [ReportController],
  providers: [ReportGeneratorService]
})
export class ReportingModule {}
