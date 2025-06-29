SRCS = $(wildcard src/*.cc) $(wildcard src/*.h) $(wildcard deps/free42/common/*.cc)

# Copied from free42 makefile
CFLAGS += -Wall \
	 -Wno-parentheses \
	 -Wno-sign-compare \
	 -Wno-format-truncation \
	 -Wno-unknown-warning-option \
	 -Wno-unknown-pragmas \
	 -DDECIMAL_CALL_BY_REFERENCE=1 \
	 -DDECIMAL_GLOBAL_ROUNDING=1 \
	 -DDECIMAL_GLOBAL_ROUNDING_ACCESS_FUNCTIONS=1 \
	 -DDECIMAL_GLOBAL_EXCEPTION_FLAGS=1 \
	 -DDECIMAL_GLOBAL_EXCEPTION_FLAGS_ACCESS_FUNCTIONS=1 \
	 -DHAVE_SINCOS=1 \
	 -Ideps/free42/common

build:
	mkdir -p out
	$(CC) $(CFLAGS) -o out/main $(SRCS)
