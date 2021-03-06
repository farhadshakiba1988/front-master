import React, { memo } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import { Bar } from '@/components/Charts';
import moment from 'jalali-moment';
moment.updateLocale('fa' , {
  months: ("فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند").split("_"),
  monthsShort: ("فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند").split("_")
});
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
    total: 323234,
  });
}

const SalesCard = memo(
  ({ rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={isActive('today')} onClick={() => selectDate('today')}>
            <FormattedMessage id="app.analysis.all-day" />
          </a>
          <a className={isActive('week')} onClick={() => selectDate('week')}>
            <FormattedMessage id="app.analysis.all-week" />
          </a>
          <a className={isActive('month')} onClick={() => selectDate('month')}>
            <FormattedMessage id="app.analysis.all-month"  />
          </a>
          <a className={isActive('year')} onClick={() => selectDate('year')}>
            <FormattedMessage id="app.analysis.all-year"  />
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          defaultPickerValue={[moment(),moment()]}
          defaultValue={moment()}
          format="YYYY-MM-DD"
          onChange={handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
      <div className={styles.salesCard}>
        <Row>
          <Col xl={16} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesBar}>
              <Bar
                height={295}
                title={
                  <FormattedMessage
                    id="app.analysis.sales-trend"
                  />
                }
                data={salesData}
              />
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>
                <FormattedMessage
                  id="app.analysis.sales-ranking"
                  defaultMessage="Sales Ranking"
                />
              </h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                        <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                          {i + 1}
                        </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                    <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  )
);

export default SalesCard;
