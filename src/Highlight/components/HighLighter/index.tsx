/**
 * 高亮能力基于highlight.js 的语法解析能力 https://highlightjs.org/
 * 听说过的还算有名的语言放在langugaes中了，需要新增语言时在languages文件夹中添加并import使用，加入到 languageMap中
 * 如果没有在 https://github.com/highlightjs/highlight.js/tree/master/src/languages 中查找是否支持，然后添加
 * 优先支持主流语言，没有import在代码中使用的不会打包
 */
import { THEME_LIGHT } from '@/Highlight/theme';
import { Loading3QuartersOutlined as Loading } from '@ant-design/icons';
import classNames from 'classnames';
import { memo } from 'react';
import { Center } from 'react-layout-kit';
import { useShiki } from '../../hooks/useShiki';
import { HighlightProps } from '../../index';
import { useStyles } from './style';

export type ShikiProps = Pick<
  HighlightProps,
  'language' | 'children' | 'theme' | 'lineNumber' | 'className' | 'style'
>;

const HighLighter: React.FC<ShikiProps> = memo((props) => {
  const { children, lineNumber = false, theme = THEME_LIGHT, language } = props;
  const { styles } = useStyles({ lineNumber, theme });
  const { renderShiki, loading } = useShiki(language, theme);

  return (
    <>
      <div
        className={classNames(styles.shiki)}
        dangerouslySetInnerHTML={{
          __html: renderShiki(children) || '',
        }}
      />
      {loading ? (
        <Center className={styles.center} gap={8} horizontal>
          <Loading spin className={styles.loading} />
        </Center>
      ) : null}
    </>
  );
});

export default HighLighter;
