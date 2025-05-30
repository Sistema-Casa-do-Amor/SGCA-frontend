// src/components/common/MaskedTextField.tsx
import React from 'react';
import { TextField, type InputBaseComponentProps, type TextFieldProps } from '@mui/material'; // Importe InputBaseComponentProps
import { IMaskInput } from 'react-imask';

// Interface para as props do IMaskInput dentro do TextField
// Agora estendendo InputBaseComponentProps para garantir compatibilidade com o TextField
interface MaskedInputProps extends InputBaseComponentProps { // <-- Importante: herdar InputBaseComponentProps
  mask: string | (string | RegExp)[]; // Ajuste o tipo da máscara para ser mais flexível, como IMaskInput aceita
  definitions?: { [key: string]: RegExp };
  lazy?: boolean;
  overwrite?: boolean;
  // name?: string; // name já vem de InputBaseComponentProps, mas é bom ter certeza se necessário
}

// Componente auxiliar que o Material-UI TextField usará como inputComponent
const MaskedInput = React.forwardRef<HTMLElement, MaskedInputProps>(
  function MaskedInput(props, ref) {
    // Desestruture as props específicas do IMaskInput e o resto (incluindo o onChange do InputBaseComponentProps)
    const { onChange, mask, definitions, lazy, overwrite, ...other } = props;

    // Use IMaskInput diretamente aqui
    return (
      <IMaskInput
        {...other} // Espalha as InputBaseComponentProps (value, onBlur, name, etc.)
        mask={mask}
        definitions={definitions}
        lazy={lazy}
        overwrite={overwrite}
        inputRef={ref as React.Ref<HTMLInputElement>} // O ref do TextField é passado para o inputRef do IMaskInput
        onAccept={(value: string) => { // Segundo parâmetro é a instância da máscara, não precisa usar
          // 'onAccept' é chamado quando o valor mascarado muda.
          // Chame o onChange original do TextField, formatando o evento para ele
          onChange({
            target: {
              name: props.name, // O nome do campo
              value: value,     // O valor mascarado
            },
            // Adicione outras propriedades do evento se necessário, embora target seja o mais comum
          } as React.ChangeEvent<HTMLInputElement>); // <-- Cast para o tipo esperado pelo TextField
        }}
      // onBlur: o `...other` já espalha o onBlur de InputBaseComponentProps,
      // então o onBlur do Controller do RHF funcionará automaticamente aqui.
      />
    );
  },
);

// Componente MaskedTextField que combina Material-UI TextField e IMaskInput
interface Props extends Omit<TextFieldProps, 'InputProps' | 'name'> { // Remova 'name' do Omit, pois ele é obrigatório
  mask: string | (string | RegExp)[]; // Ajuste o tipo da máscara
  definitions?: { [key: string]: RegExp };
  lazy?: boolean;
  overwrite?: boolean;
  name: string; // Torna name obrigatório, pois é usado internamente
}

const MaskedTextField: React.FC<Props> = ({
  mask,
  definitions,
  lazy = false,
  overwrite = true,
  helperText, // <--- Pegue o helperText das props
  error,      // <--- Pegue o error das props
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      error={error} // Passe a prop error original
      helperText={helperText || " "} // Passa a mensagem de erro ou um espaço em branco
      InputProps={{
        inputComponent: MaskedInput, // Tipo agora deve estar correto
        inputProps: {
          mask,
          definitions,
          lazy,
          overwrite,
        },
      }}
      FormHelperTextProps={{
        sx: {
          maxHeight: '0.4em',
          margin: '0 0.2em', // Zera a margem inferior padrão
          padding: 0
        },
      }}
    />
  );
};

export default MaskedTextField;